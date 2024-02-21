const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret");

const isLoggedIn = async (req, res, next) => {
  try {
    const bearerToken = req.headers?.authorization?.split(" ")[1];
    const cookiesToken = req.cookies.access_token;
    const accessToken = bearerToken //// || cookiesToken;
    
    if (!accessToken || accessToken == "null") {
      throw createHttpError(401, "Please log in");
    }
    const user = jwt.verify(accessToken, jwtAccessKey);
    
    if (!user) {
      throw createHttpError(401, "Invalid access token");
    }
    req.body.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (token) {
      const user = jwt.verify(token, jwtAccessKey);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.body.user;
    if (!user.isAdmin) {
      throw createHttpError(401, "Only admin has access to this");
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
