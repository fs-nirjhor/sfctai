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
const Transaction = require("../models/transactionModel");
const { successResponse } = require("../controllers/responseController");
const User = require("../models/userModel");

const transactionRouter = express.Router();

transactionRouter.post("/", isLoggedIn, handleGetTransaction);

transactionRouter.post("/recharge-request", isLoggedIn, handleRechargeRequest); //! new

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
); //! new
transactionRouter.post("/bonus", isLoggedIn, isAdmin, handleBonus); //!new
transactionRouter.post("/reduce", isLoggedIn, isAdmin, handleReduce); //!new

// approve withdrawal //! new
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

//! temporary for pending of transaction, reduce and bonus of user
transactionRouter.put(
  "/temporary",
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const updateOptions = {
        new: true,
        runValidators: true,
        context: "query",
      };

      const pendingFalse = await Transaction.updateMany(
        { $or: [{ isApproved: true }, { isRejected: true }] },
        { isPending: false },
        updateOptions
      );

      const pendingTrue = await Transaction.updateMany(
        { isApproved: false, isRejected: false },
        { isPending: true },
        updateOptions
      );

      const updatedUser = await User.updateMany(
        {},
        {
          "transaction.totalReduce": 0,
          "transaction.totalBonus": 0,
        },
        updateOptions
      );

      console.log(pendingFalse, pendingTrue, updatedUser);

      return successResponse(res, {
        statusCode: 200,
        message: `pending successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = transactionRouter;
