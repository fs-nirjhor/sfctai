const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");

const { updateItemById } = require("../services/updateItem");
const Transaction = require("../models/transactionModel");
const { createItem } = require("../services/createItem");
const { successResponse } = require("./responseController");
const { findItemById } = require("../services/findItem");
const User = require("../models/userModel");
const Configuration = require("../models/configurationModel");
const { createRandomString } = require("../helper/createRandom");
const { setPagination } = require("../helper/managePagination");
const deleteFile = require("../helper/deleteFile");
const { mainDirectory } = require("../config/config");
const { deleteImageBySecureUrl } = require("../helper/deleteCloudinaryFile");
const { messaging } = require("../config/firebase.init");

const handleGetTransaction = async (req, res, next) => {
  try {
    const { filter } = req.body;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const search = req.query.search || "";

    // all transaction
    /* const allTransaction = await Transaction.find(filter)
      .populate("client")
      .sort({ isApproved: 1 })
      .sort({ updatedAt: -1 });

    if (!allTransaction) {
      throw new Error("Failed to get transactions");
    } */

    if (search) {
      filter.$or = [
        { client: { $regex: searchRegExp } },
        { credential: { $regex: searchRegExp } },
      ];
    }

    const allTransaction = await Transaction.find(filter)
      .sort({ isApproved: 1 })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("client")
      .lean();

    if (!allTransaction) {
      throw createHttpError(404, "No transaction found");
    }
    // set pagination
    const count = await Transaction.find(filter).countDocuments();
    const result = allTransaction.length;

    const pagination = setPagination(count, limit, page, result);

    return successResponse(res, {
      statusCode: 200,
      message: `${count || 0} transaction found`,
      payload: { allTransaction, pagination },
    });
  } catch (error) {
    next(error);
  }
};

const handleAddTransaction = async (req, res, next) => {
  try {
    const { transaction } = req.body;
    const { client, amount, credential, category, isApproved } = transaction;
    const user = await User.findById(client);

    // validate transaction
    if (category === "Recharge" && credential) {
      const allTransaction = await Transaction.exists({
        credential: credential,
      });
      if (allTransaction) {
        throw createHttpError(409, "TXID already submitted");
      }
      // set notification data
      const origin = req.headers.origin;

      const topic = "admin";
      const link = `${origin}/client/${client}`;
      const badge = `${origin}/api/assets/icon.png`;
      const icon = user.avatar;
      const tag = `transaction-${client}`;
      const title = `${user.name} request for Recharge`;
      const body = `Credential: ${credential} \nName: ${user.name} \nID: ${user.userId}`;

      const notificationData = {
        topic: topic,
        data: {
          title: title,
          body: body,
          icon: icon,
          badge: badge,
          link: link,
          tag: tag,
        },
        android: {
          notification: {
            title: title,
            body: body,
            icon: badge,
            color: "#38bdf8",
            clickAction: link,
          },
        },
        apns: {
          payload: {
            aps: {
              "mutable-content": 1,
            },
          },
          fcm_options: {
            image: badge,
          },
        },
      };
      // send notification
      await messaging.send(notificationData);
    }

    // add new transaction
    const newTransaction = await createItem(Transaction, transaction);

    if (!newTransaction) {
      throw createHttpError(400, `Failed to ${newTransaction.category}`);
    }

    return successResponse(res, {
      statusCode: 200,
      message: `${newTransaction.category} requested successfully`,
      payload: { newTransaction },
    });
  } catch (error) {
    next(error);
  }
};

const handleAddRecharge = async (req, res, next) => {
  try {
    const { recharge } = req.body;
    const { client, amount, transactionId } = recharge;
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
      select: "-loginPassword -withdrawalPassword",
    };

    // approve transaction
    if (transactionId) {
      await updateItemById(
        Transaction,
        transactionId,
        { isApproved: true, amount },
        updateOptions
      );
    }

    // user update
    userUpdates = {
      $inc: {
        "transaction.balance": Number(amount),
        "transaction.todaysRecharge": Number(amount),
        "transaction.totalRecharge": Number(amount),
      },
    };

    const updatedUser = await updateItemById(
      User,
      client,
      userUpdates,
      updateOptions
    );

    if (!updatedUser) {
      throw new Error("Failed to recharge");
    }

    // set notification data
    const origin = req.headers.origin;

    const topic = client + "";
    const link = `${origin}/my/fund-history`;
    const badge = `${origin}/api/assets/icon.png`;
    const icon = `${origin}/api/assets/icon.png`;
    const tag = `transaction-${client}`;
    const title = "Balance Added!";
    const body = `Amount: $${amount} \nBalance: $${updatedUser.transaction.balance.toFixed(
      2
    )} \nName: ${updatedUser.name} \nID: ${updatedUser.userId}`;

    const notificationData = {
      topic: topic,
      data: {
        title: title,
        body: body,
        icon: icon,
        badge: badge,
        link: link,
        tag: tag,
      },
      android: {
        notification: {
          title: title,
          body: body,
          icon: badge,
          color: "#38bdf8",
          clickAction: link,
        },
      },
      apns: {
        payload: {
          aps: {
            "mutable-content": 1,
          },
        },
        fcm_options: {
          image: badge,
        },
      },
    };
    // send notification
    await messaging.send(notificationData);

    return successResponse(res, {
      statusCode: 200,
      message: `Recharge $${amount} Successfully!`,
      payload: { updatedUser },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleOrderRequest = async (req, res, next) => {
  try {
    const { transaction } = req.body;
    const { client, userId, amount, estimateRevenue, coin } = transaction;
    const credential = createRandomString(7) + userId;
    const orderData = {
      client,
      credential,
      coin,
      amount: Number(amount),
      estimateRevenue: Number(estimateRevenue),
      category: "Order",
    };

    //? is user exist
    const user = await findItemById(User, client);
    const configuration = await Configuration.findOne();

    //? is time
    const options = { timeZone: "Asia/Riyadh", hour: "numeric" };
    const currentHour = new Date().toLocaleTimeString("en-GB", options);
    if (!(currentHour >= 10 && currentHour < 22)) {
      throw createHttpError(
        403,
        "Allowed trade time is 10:00 - 22:00 (Arabic Time)"
      );
    }

    //? is balace sufficient
    if (user.transaction.balance < 10) {
      throw createHttpError(403, "Insufficent Balance");
    }

    // is order available
    if (user.transaction.todaysOrder >= configuration.orderPerDay) {
      throw createHttpError(403, "Limit Exceeded");
    }

    // add new order
    const newOrder = await createItem(Transaction, orderData);
    if (!newOrder) {
      throw new Error("Failed to Trade");
    }

    // user update
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
      select: "-loginPassword -withdrawalPassword",
    };

    userUpdates = {
      $set: {
        "transaction.balance": Number(estimateRevenue),
        "transaction.isOrderPending": true,
      },
      $inc: {
        "transaction.todaysOrderAmount":
          Number(amount) - Number(estimateRevenue),
        "transaction.totalOrderAmount":
          Number(amount) - Number(estimateRevenue),
        "transaction.todaysOrder": 1,
        "transaction.totalOrder": 1,
      },
    };

    const updatedUser = await updateItemById(
      User,
      user._id,
      userUpdates,
      updateOptions
    );

    if (!updatedUser) {
      throw new Error("Failed to withdraw");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Trade Successfull",
      payload: { newOrder },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleWithdrawalRequest = async (req, res, next) => {
  try {
    const {
      client,
      withDrawAmount,
      actualAmount,
      credential,
      password,
      photo,
    } = req.body;
    //? is user exist
    const user = await findItemById(User, client);
    const configuration = await Configuration.findOne();
    const minimumWithdraw = Number(configuration.minimumWithdraw);

    // is time
    const options = { timeZone: "Asia/Riyadh", hour: "numeric" };
    const currentHour = new Date().toLocaleTimeString("en-GB", options);
    if (!(currentHour >= 10 && currentHour < 22)) {
      throw createHttpError(
        403,
        "Allowed withdraw time is 10:00 - 22:00 (Arabic Time)"
      );
    }

    // is balance sufficent
    if (Number(withDrawAmount) > user.transaction.balance) {
      throw createHttpError(403, "Insufficent balance");
    }

    // is usdt bind
    if (!user.trc20Address) {
      throw createHttpError(403, "Please bind your id");
    }

    // is low withdraw
    if (Number(withDrawAmount) < minimumWithdraw) {
      throw createHttpError(403, `Minimum withdraw is $${minimumWithdraw}`);
    }

    // is withdraw already
    if (user.transaction.todaysWithdraw) {
      throw createHttpError(403, "Only 1 withdraw per day");
    }

    //? is login password matched
    const isMatch = await bcrypt.compare(password, user.withdrawalPassword);
    if (!isMatch) {
      throw createHttpError(403, "Incorrect withdrawal password");
    }

    //? is user banned
    if (user.isBanned) {
      throw createHttpError(403, "This account is banned");
    }

    const transactionUpdates = {
      client,
      amount: actualAmount,
      withDrawAmount,
      credential,
      photo,
      category: "Withdraw",
    };

    // add new transaction
    const newTransaction = await createItem(Transaction, transactionUpdates);

    if (!newTransaction) {
      throw new Error(`Failed to withdraw`);
    }

    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
      select: "-loginPassword -withdrawalPassword",
    };

    userUpdates = {
      $set: {
        "transaction.balance":
          Number(user.transaction.balance) - Number(withDrawAmount),
        "transaction.todaysWithdraw":
          Number(user.transaction.todaysWithdraw) + Number(withDrawAmount),
        "transaction.totalWithdraw":
          Number(user.transaction.totalWithdraw) + Number(withDrawAmount),
      },
    };

    const updatedUser = await updateItemById(
      User,
      user._id,
      userUpdates,
      updateOptions
    );

    if (!updatedUser) {
      throw new Error("Failed to withdraw");
    }
    // set notification data
    const origin = req.headers.origin;

    const topic = "admin";
    const link = `${origin}/client/${client}`;
    const badge = `${origin}/api/assets/icon.png`;
    const icon = updatedUser.avatar;
    const tag = `transaction-${client}`;
    const title = `${updatedUser.name} request for withdraw`;
    const body = `Amount: $${actualAmount} \nCredential: ${credential} \nName: ${updatedUser.name} \nID: ${updatedUser.userId}`;

    const notificationData = {
      topic: topic,
      data: {
        title: title,
        body: body,
        icon: icon,
        badge: badge,
        link: link,
        tag: tag,
      },
      android: {
        notification: {
          title: title,
          body: body,
          icon: badge,
          color: "#38bdf8",
          clickAction: link,
        },
      },
      apns: {
        payload: {
          aps: {
            "mutable-content": 1,
          },
        },
        fcm_options: {
          image: badge,
        },
      },
    };
    // send notification
    await messaging.send(notificationData);

    return successResponse(res, {
      statusCode: 200,
      message: "Withdraw requested successfully",
      payload: { newTransaction },
    });
  } catch (error) {
    next(error);
  }
};

const handleRejectTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = { isRejected: true };

    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };

    const rejectedTransaction = await updateItemById(
      Transaction,
      id,
      updates,
      updateOptions
    );

    if (!rejectedTransaction) {
      throw new Error(`Failed to reject ${rejectedTransaction.category}`);
    }

    if (rejectedTransaction.category === "Withdraw") {
      // delete image from server
      /* const filePath =
      rejectedTransaction.photo?.replace("api", mainDirectory);
      await deleteFile(filePath); */
      // delete image from cloudinary
      const deletedImage = await deleteImageBySecureUrl(
        rejectedTransaction.photo
      );

      const withDrawAmount = Number(rejectedTransaction.withDrawAmount);
      userUpdates = {
        $inc: {
          "transaction.balance": withDrawAmount,
          "transaction.totalWithdraw": -withDrawAmount,
        },
      };

      const updatedUser = await updateItemById(
        User,
        rejectedTransaction.client,
        userUpdates,
        updateOptions
      );

      if (!updatedUser) {
        throw new Error("Failed return balance");
      }
    }
    // set notification data
    const origin = req.headers.origin;

    const topic = rejectedTransaction.client + "";
    const link = `${origin}/client/${rejectedTransaction.client}`;
    const badge = `${origin}/api/assets/icon.png`;
    const icon = `${origin}/api/assets/icon.png`;
    const tag = `transaction-${rejectedTransaction.client}`;
    const title = `${rejectedTransaction.category} Rejected!`;
    const body = `Credential: ${rejectedTransaction.credential}`;

    const notificationData = {
      topic: topic,
      data: {
        title: title,
        body: body,
        icon: icon,
        badge: badge,
        link: link,
        tag: tag,
      },
      android: {
        notification: {
          title: title,
          body: body,
          icon: badge,
          color: "#38bdf8",
          clickAction: link,
        },
      },
      apns: {
        payload: {
          aps: {
            "mutable-content": 1,
          },
        },
        fcm_options: {
          image: badge,
        },
      },
    };
    // send notification
    await messaging.send(notificationData);

    return successResponse(res, {
      statusCode: 200,
      message: `${rejectedTransaction.category} approved successfully`,
      payload: { rejectedTransaction },
    });
  } catch (error) {
    next(error);
  }
};

const handleApproveTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { updates } = req.body;

    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };

    const approvedTransaction = await updateItemById(
      Transaction,
      id,
      updates,
      updateOptions
    );

    if (!approvedTransaction) {
      throw new Error(`Failed to approve ${approvedTransaction.category}`);
    }
    if (approvedTransaction.category === "Withdraw" && updates.isApproved) {
      // delete image from server
      /* const filePath =
      approvedTransaction.photo?.replace("api", mainDirectory);
      await deleteFile(filePath); */
      // delete image from cloudinary
      const deletedImage = await deleteImageBySecureUrl(
        approvedTransaction.photo
      );
      // set notification data
      const origin = req.headers.origin;

      const topic = approvedTransaction.client + "";
      const link = `${origin}/my/fund-history`;
      const badge = `${origin}/api/assets/icon.png`;
      const icon = `${origin}/api/assets/icon.png`;
      const tag = `transaction-${approvedTransaction.client}`;
      const title = "Withdraw Approved!";
      const body = `Amount: $${approvedTransaction.amount} \nCredential: ${approvedTransaction.credential}`;

      const notificationData = {
        topic: topic,
        data: {
          title: title,
          body: body,
          icon: icon,
          badge: badge,
          link: link,
          tag: tag,
        },
        android: {
          notification: {
            title: title,
            body: body,
            icon: badge,
            color: "#38bdf8",
            clickAction: link,
          },
        },
        apns: {
          payload: {
            aps: {
              "mutable-content": 1,
            },
          },
          fcm_options: {
            image: badge,
          },
        },
      };
      // send notification
      await messaging.send(notificationData);
    }

    return successResponse(res, {
      statusCode: 200,
      message: `${approvedTransaction.category} approved successfully`,
      payload: { approvedTransaction },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddTransaction,
  handleAddRecharge,
  handleWithdrawalRequest,
  handleOrderRequest,
  handleGetTransaction,
  handleApproveTransaction,
  handleRejectTransaction,
};
