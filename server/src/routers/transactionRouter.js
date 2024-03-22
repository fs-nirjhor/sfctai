const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  handleWithdrawalRequest,
  handleOrderRequest,
  handleGetTransaction,
  handleRejectTransaction,
  handleApproveWithdraw,
  handleBonus,
  handleApproveRecharge,
  handleRechargeRequest,
  handleReduce,
} = require("../controllers/transactionController");
const {
  uploadWithdrawPhoto,
  withdrawImageToCloudinary,
} = require("../middlewares/uploadFile");

const transactionRouter = express.Router();

transactionRouter.post("/", isLoggedIn, handleGetTransaction);

transactionRouter.post("/recharge-request", isLoggedIn, handleRechargeRequest);

transactionRouter.post("/order-request", isLoggedIn, handleOrderRequest);

transactionRouter.post(
  "/withdraw-request",
  isLoggedIn,
  uploadWithdrawPhoto.single("photo"),
  withdrawImageToCloudinary,
  handleWithdrawalRequest
);

transactionRouter.put(
  "/approve-recharge",
  isLoggedIn,
  isAdmin,
  handleApproveRecharge
);
transactionRouter.post("/bonus", isLoggedIn, isAdmin, handleBonus);
transactionRouter.post("/reduce", isLoggedIn, isAdmin, handleReduce);
// approve withdrawal
transactionRouter.put(
  "/approve-withdraw/:id",
  isLoggedIn,
  isAdmin,
  handleApproveWithdraw
);
// reject transaction
transactionRouter.put(
  "/reject/:id",
  isLoggedIn,
  isAdmin,
  handleRejectTransaction
);

module.exports = transactionRouter;
