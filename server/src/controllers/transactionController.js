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

const handleGetTransaction = async (req, res, next) => {
  try {
    const { filter } = req.body;
    // all transaction
    const allTransaction = await Transaction.find(filter)
      .populate("client")
      .sort({ isApproved: 1, updatedAt: -1 });

    if (!allTransaction) {
      throw new Error("Failed to get transactions");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Transantions get successfully",
      payload: { allTransaction },
    });
  } catch (error) {
    next(error);
  }
};

const handleAddTransaction = async (req, res, next) => {
  try {
    const { transaction } = req.body;

    // validate transaction
    if (transaction.category === "Recharge"){
      const allTransaction = await Transaction.exists({credential: transaction.credential});
      if (allTransaction) {
       throw createHttpError(409,"TXID already submitted");
      }
    }

    // add new transaction
    const newTransaction = await createItem(Transaction, transaction);

    if (!newTransaction) {
      throw createHttpError(400,`Failed to ${newTransaction.category}`);
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

    return successResponse(res, {
      statusCode: 200,
      message: `Recharge $${amount} Successful`,
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
        "Allowed trade time is 10:00 - 22:00 (Riyadh)"
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
    const { transaction } = req.body;
    const {
      client,
      withDrawAmount,
      actualAmount,
      credential,
      category,
      password,
    } = transaction;

    //? is user exist
    const user = await findItemById(User, client);
    const configuration = await Configuration.findOne();
    const minimumWithdraw = Number(configuration.minimumWithdraw);

    // is balance sufficent
    if (Number(withDrawAmount) > user.transaction.balance) {
      throw createHttpError(403, "Insufficent balance");
    }

    // is usdt bind
    if (!user.trc20Address) {
      throw createHttpError(403, "Please Bind USDT");
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
      credential,
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

    return successResponse(res, {
      statusCode: 200,
      message: "Withdraw requested successfully",
      payload: { newTransaction },
    });
  } catch (error) {
    next(error);
  }
};

const handleApproveTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;

    const updates = { isApproved: true };
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
};
