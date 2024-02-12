const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { findOneItem, findItemById } = require("../services/findItem");
const { createJwt } = require("../helper/manageJWT");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createHttpError = require("http-errors");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../helper/cookie");

const handleLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    //? is phone and password provided
    if (!phone || !password) {
      throw createHttpError(403, "Please input your email and password");
    }
    //? is user exist
    const user = await findOneItem(User, { phone });

    //? is user banned
    if (user.isBanned) {
      throw createHttpError(403, "This account is banned");
    }

    //? is login password matched
    const isMatch = await bcrypt.compare(password, user.loginPassword);
    if (!isMatch) {
      throw createHttpError(403, "Wrong password");
    }

    const tokenData = {
      id: user._id,
      password: user.loginPassword,
      isAdmin: user.isAdmin,
    };

    // set access token
    const accessToken = await createJwt(tokenData, jwtAccessKey, "3d");
    setAccessTokenCookie(res, accessToken);

    // set refresh token
    const refreshToken = await createJwt(tokenData, jwtRefreshKey, "15d");
    setRefreshTokenCookie(res, refreshToken);

    // prevent showing password in payload. user from database is not a pure object without lean
    delete user.password;
    return successResponse(res, {
      statusCode: 200,
      message: "Logged in successfully",
      payload: { user },
    });
  } catch (error) {
    return next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    // check access cookie
    if (!req.cookies.access_token) {
      throw createHttpError(401, "User already logged out");
    }
    // clear access cookie
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return successResponse(res, {
      statusCode: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refresh_token;
    if (!oldRefreshToken) {
      throw createHttpError(401, "Please login");
    }
    const decoded = jwt.verify(oldRefreshToken, jwtRefreshKey);
    if (!decoded) {
      throw createHttpError(401, "Refresh token is invalid or expired");
    }

    // get user information
    const options = {
      populate: {
        path: "invitedBy team.level1 team.level2 team.level3",
        model: "User",
      },
      loginPassword: 0,
      withdrawalPassword: 0,
    };
    const user = await findItemById(User, decoded._id, {}, options);

    const tokenData = {
      id: user._id,
      password: user.loginPassword,
      isAdmin: user.isAdmin,
    };
    // set access token
    const accessToken = await createJwt(tokenData, jwtAccessKey, "3d");
    setAccessTokenCookie(res, accessToken);

    // set refresh token
    const refreshToken = await createJwt(tokenData, jwtRefreshKey, "15d");
    setRefreshTokenCookie(res, refreshToken);

    return successResponse(res, {
      statusCode: 200,
      message: "Refreshed token successfully",
      payload: { access: true, user },
    });
  } catch (error) {
    return next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
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

    return successResponse(res, {
      statusCode: 200,
      message: "Authenticated successfully",
      payload: { user },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtectedRoute,
};
