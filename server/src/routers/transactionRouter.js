const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  handleAddTransaction,
  handleApproveTransaction,
  handleWithdrawalRequest,
  handleOrderRequest,
  handleGetTransaction,
  handleAddRecharge,
} = require("../controllers/transactionController");

const transactionRouter = express.Router();

transactionRouter.post("/", isLoggedIn, handleGetTransaction);
transactionRouter.post("/recharge-request", isLoggedIn, handleAddTransaction);

transactionRouter.post("/order-request", isLoggedIn, handleOrderRequest);

transactionRouter.post(
  "/withdraw-request",
  isLoggedIn,
  handleWithdrawalRequest
);

transactionRouter.put("/add-recharge", isLoggedIn, isAdmin, handleAddRecharge);

transactionRouter.put(
  "/approve/:id",
  isLoggedIn,
  isAdmin,
  handleApproveTransaction
);

module.exports = transactionRouter;
