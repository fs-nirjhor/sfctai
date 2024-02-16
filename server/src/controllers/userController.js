// manage getting all user data

const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const {
  findItemById,
  findOneItem,
  findAllUsers,
} = require("../services/findItem");
const { createJwt } = require("../helper/manageJWT");
const { clientUrl, jwtResetPasswordKey } = require("../secret");
const jwt = require("jsonwebtoken");
const sendMail = require("../helper/useNodemailer");
const { defaultUserImagePath } = require("../config/config");
const { deleteItem } = require("../services/deleteItem");
const {
  updateIsBanned,
  updateItemById,
  updateManyKey,
  updateItem,
} = require("../services/updateItem");
const { createItem } = require("../services/createItem");
const Chat = require("../models/chatModel");
const Transaction = require("../models/transactionModel");

const handleRegistration = async (req, res, next) => {
  try {
    const { invitationCode, ...newUser } = req.body;
    const invitationData = invitationCode
      ? { invitationCode }
      : { invitationCode: "SFCTAI" };
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };
    // find inviter

    const inviter = await User.findOne(invitationData);
    if (!inviter) {
      throw createHttpError(404, "Invalid Invitation Code");
    }
    // add invitedBy
    newUser.invitedBy = inviter._id;
    // create user
    const createdUser = await createItem(User, newUser);

    // add to level1 team
    const level1Inviter = await updateItemById(
      User,
      inviter._id,
      { $push: { ["team.level1"]: createdUser._id } },
      updateOptions
    );

    if (!level1Inviter) {
      throw createHttpError(404, "Failed to add level1 team");
    }
    // add to level2 team
    const level2Inviter = await User.findByIdAndUpdate(
      level1Inviter.invitedBy,
      { $push: { ["team.level2"]: createdUser._id } },
      updateOptions
    );
    if (!level2Inviter) {
      throw createHttpError(404, "Failed to add level2 team");
    }

    // add to level3 team
    const level3Inviter = await updateItemById(
      User,
      level2Inviter.invitedBy,
      { $push: { ["team.level3"]: createdUser._id } },
      updateOptions
    );
    if (!level3Inviter) {
      throw createHttpError(404, "Failed to add level3 team");
    }

    return successResponse(res, {
      statusCode: 200,
      message: `User registered successfully`,
      payload: { createdUser },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleUpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { user, ...data } = req.body; // user is set in req.body from isLoggedIn middleware. it must not include in data

    if (Object.keys(data).length === 0) {
      throw createHttpError(400, "Nothing to update");
    }

    const updates = {};
    for (let key in data) {
      updates[key] = data[key];
    }

    const filter = { _id: id };
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
      select: "-loginPassword -withdrawalPassword",
    };

    const updatedUser = await updateItem(User, filter, updates, updateOptions);
    if (!updatedUser) {
      throw new Error("Failed to update");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdatePassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { user, newPassword, confirmPassword, ...data } = req.body;

    const userData = await findItemById(User, id);
    const updates = {};

    const updateKeys = ["loginPassword", "withdrawalPassword"];

    for (let key in data) {
      if (!updateKeys.includes(key)) {
        throw createHttpError(400, `${key} can\'t be updated`);
      }
      //? is password matched
      const isMatch = await bcrypt.compare(data[key], userData[key]);
      if (!isMatch) {
        throw createHttpError(403, "Incorrect current password");
      }
      updates[key] = newPassword;
    }

    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
      select: "-password",
    };
    const updatedUser = await updateItemById(User, id, updates, updateOptions);
    if (!updatedUser) throw new Error("Password can't be updated");
    return successResponse(res, {
      statusCode: 200,
      message: "password is updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleGetAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const { users, count, pagination } = await findAllUsers(
      search,
      limit,
      page
    );
    const range = `${(page * limit) - (limit - 1)}-${(page * limit) - (limit - 1) + (users.length-1)}`;
    return successResponse(res, {
      statusCode: 200,
      message: `${range || 0} / ${count || 0}`,
      payload: { users, pagination },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const filter = { userId: id };
    const select = { loginPassword: 0, withdrawPassword: 0 };
    const options = {
      populate: {
        path: "invitedBy team.level1 team.level2 team.level3",
        model: "User",
      },
      loginPassword: 0,
      withdrawalPassword: 0,
    };
    const user = await findOneItem(User, filter, select, options);
    return successResponse(res, {
      statusCode: 200,
      message: "User returned successfully",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const options = { password: 0 };
    const deletedUser = await deleteItem(User, filter, options);
    const deletedTransaction = await Transaction.findOneAndDelete({
      client: id,
    });
    const deletedChat = await Chat.findOneAndDelete({ client: id });

    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
      select: "-password",
    };
    // remove from level1 team
    const level1Inviter = await updateItemById(
      User,
      deletedUser.invitedBy,
      { $pull: { ["team.level1"]: id } },
      updateOptions
    );

    if (!level1Inviter) {
      throw createHttpError(404, "Failed to remove from level1 team");
    }
    // remove from level2 team
    const level2Inviter = await User.findByIdAndUpdate(
      level1Inviter.invitedBy,
      { $pull: { ["team.level2"]: id } },
      updateOptions
    );
    if (!level2Inviter) {
      throw createHttpError(404, "Failed to remove from level2 team");
    }

    // remove from level3 team
    const level3Inviter = await updateItemById(
      User,
      level2Inviter.invitedBy,
      { $pull: { ["team.level3"]: id } },
      updateOptions
    );
    if (!level3Inviter) {
      throw createHttpError(404, "Failed to remove from level3 team");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      payload: { deletedUser },
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    //? is user exist
    const user = await findOneItem(User, { phone });
    const token = createJwt({ id: user._id }, jwtResetPasswordKey, "10m");
    // send verification email
    const mailData = {
      email,
      subject: "Reset Password Email",
      html: `
      <h2>Hello ${user.name}</h2>
      <p>Click here to <a href='${clientUrl}/api/users/reset-password/${token}' target="_blank" rel="noopener noreferrer">Reset your password</a></p>
      `,
    };
    const mailInfo = await sendMail(mailData);
    if (!mailInfo) throw new Error("Couldn't send mail");
    return successResponse(res, {
      statusCode: 200,
      message: `Reset password mail sent to ${email}`,
    });
  } catch (error) {
    next(error);
  }
};

const handleResetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    // verify jwt token
    const decoded = await jwt.verify(token, jwtResetPasswordKey);
    if (!decoded) {
      throw createHttpError(400, "JWT token is invalid or expired");
    }
    // reset password
    const updates = { password: newPassword };
    const updateOptions = { new: true, runValidators: true, context: "query" };
    const updatedUser = await updateItemById(
      User,
      decoded.id,
      updates,
      updateOptions
    );
    if (!updatedUser) throw new Error("Password can't be updated");
    return successResponse(res, {
      statusCode: 200,
      message: `Password reset successfully`,
    });
  } catch (error) {
    next(error);
  }
};

const handleUserStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const action = req.body.action;
    const bannedUser = await updateIsBanned(id, action);
    return successResponse(res, {
      statusCode: 200,
      message: `${bannedUser.name} is ${
        bannedUser.isBanned ? "banned" : "unbanned"
      } successfully`,
      payload: { bannedUser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleRegistration,
  handleGetAllUsers,
  handleGetUser,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
  handleUserStatus,
};
