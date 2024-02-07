const { validationResult } = require("express-validator");
const { errorResponse } = require("../controllers/responseController");

const runValidations = (req, res, next) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    const message = result.array().map(err => err.msg).join("\n")
    console.log(message)
    return errorResponse(res, {
      statusCode: 422,
      message: message,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = runValidations;
