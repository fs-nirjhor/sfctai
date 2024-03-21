const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  handleAddTransaction,
  handleApproveTransaction,
  handleWithdrawalRequest,
  handleOrderRequest,
  handleGetTransaction,
  handleAddRecharge,
  handleRejectTransaction,
} = require("../controllers/transactionController");
const {
  uploadWithdrawPhoto,
  compressWithdrawImage,
  withdrawImageToCloudinary,
} = require("../middlewares/uploadFile");

const transactionRouter = express.Router();

transactionRouter.post("/", isLoggedIn, handleGetTransaction);

transactionRouter.post("/recharge-request", isLoggedIn, handleAddTransaction);

transactionRouter.post("/order-request", isLoggedIn, handleOrderRequest);

transactionRouter.post(
  "/withdraw-request",
  isLoggedIn,
  uploadWithdrawPhoto.single("photo"),
  withdrawImageToCloudinary,
  handleWithdrawalRequest
);

transactionRouter.put("/add-recharge", isLoggedIn, isAdmin, handleAddRecharge);

transactionRouter.put(
  "/approve/:id",
  isLoggedIn,
  isAdmin,
  handleApproveTransaction
);

transactionRouter.put(
  "/reject/:id",
  isLoggedIn,
  isAdmin,
  handleRejectTransaction
);

module.exports = transactionRouter;
