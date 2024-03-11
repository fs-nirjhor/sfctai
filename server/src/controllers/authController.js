const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { findOneItem, findItemById } = require("../services/findItem");
const { createJwt } = require("../helper/manageJWT");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createHttpError = require("http-errors");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");
const { setAccessTokenCookie } = require("../helper/cookie");
const {
  subscribeToNotification,
  unsubscribeFromNotification,
} = require("../helper/notificationHelper");

const handleLogin = async (req, res, next) => {
  try {
    const { phone, password, deviceId } = req.body;

    //? is phone and password provided
    if (!phone || !password) {
      throw createHttpError(403, "Please input your number and password");
    }
    //? is user exist
    const user = await User.findOne({ phone }).lean();

    //? is user banned
    if (!user) {
      throw createHttpError(404, "Incorrect number or password");
    }
    //? is user banned
    if (user.isBanned) {
      throw createHttpError(403, "This account is banned");
    }

    //? is login password matched
    const isMatch = await bcrypt.compare(password, user.loginPassword);
    if (!isMatch) {
      throw createHttpError(403, "Wrong password");
    }

    // set access token
    const tokenData = {
      id: user._id,
      password: user.loginPassword,
      isAdmin: user.isAdmin,
    };
    const accessToken = createJwt(tokenData, jwtAccessKey, "15d");
    //setAccessTokenCookie(res, accessToken);

    // subsctibe to notification
    if (deviceId) {
     await subscribeToNotification(deviceId, user._id+"", user.isAdmin);
    }
    if (deviceId && !user.deviceId?.includes(deviceId)) {
      await User.findOneAndUpdate({ phone }, { $push: { deviceId: deviceId } },
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      ).lean();
    }

    // prevent showing password in payload. user from database is not a pure object without lean
    delete user.loginPassword;
    delete user.withdrawalPassword;
    return successResponse(res, {
      statusCode: 200,
      message: "Logged in successfully",
      payload: { user, accessToken },
    });
  } catch (error) {
    return next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    const { deviceId, userId, isAdmin } = req.body;
    // unsubscribe from notification
    if (deviceId) {
      await unsubscribeFromNotification(deviceId, userId+"", isAdmin);
      await User.findByIdAndUpdate(userId, { $pull: { deviceId: deviceId } },
       {
         new: true,
         runValidators: true,
         context: "query",
       }
     ).lean();
    }
    // check access cookie
    /* if (!req.cookies.access_token) {
      throw createHttpError(401, "User already logged out");
    } */
    // clear access cookie
    // res.clearCookie("access_token");

    return successResponse(res, {
      statusCode: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const bearerToken = req.headers?.authorization?.split(" ")[1];
    const cookiesToken = req.cookies.access_token;
    const accessToken = bearerToken; //// || cookiesToken;
    if (!accessToken || accessToken == "null") {
      throw createHttpError(401, "Please login");
    }
    const decoded = jwt.verify(accessToken, jwtAccessKey);
    if (!decoded) {
      throw createHttpError(401, "Access token is invalid or expired");
    }
    const options = {
      populate: {
        path: "invitedBy team.level1 team.level2 team.level3",
        populate: {
          path: "invitedBy team.level1 team.level2 team.level3",
        },
        model: "User",
      },
      loginPassword: 0,
      withdrawalPassword: 0,
    };

    const user = await findItemById(User, decoded.id, {}, options);

    // refresh access token
    const tokenData = {
      id: user._id,
      password: user.loginPassword,
      isAdmin: user.isAdmin,
    };

    const refreshedToken = createJwt(tokenData, jwtAccessKey, "15d");
    //setAccessTokenCookie(res, refreshedToken);

    return successResponse(res, {
      statusCode: 200,
      message: "Authenticated successfully",
      payload: { user, accessToken: refreshedToken },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleProtectedRoute,
};
