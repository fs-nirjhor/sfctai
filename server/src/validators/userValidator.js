const { body } = require("express-validator");
const createHttpError = require("http-errors");

const validateUserRegistration = [
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Please enter your phone number")
    .isLength({ min: 6, max: 18 })
    .withMessage("Phone number must have 6-18 characters"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Please enter your name")
    .isLength({ min: 3, max: 10 })
    .withMessage("User name must have 3-10 characters"),
  body("loginPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Password must have 6-32 characters"),
  body("withdrawalPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Password must have 6-32 characters"),
];

const validateUserLogin = [
  body("phone").trim().notEmpty().withMessage("Please enter your phone number"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter your login password"),
];

const validateForgetPassword = [
  body("phone").trim().notEmpty().withMessage("Please enter your phone number"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter your email address")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .toLowerCase(),
];

const validateResetPassword = [
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 6, max: 8 })
    .withMessage("Password must have 6-8 characters"),
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateForgetPassword,
  validateResetPassword,
};
