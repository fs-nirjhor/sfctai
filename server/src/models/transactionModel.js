const { model, Schema } = require("mongoose");

const transactionSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    credential: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: 0,
    },
    withDrawAmount: {
      type: Number,
    },
    estimateRevenue: {
      type: Number,
    },
    coin: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      validate: [
        {
          validator: function (value) {
            return (
              value == "Recharge" ||
              value == "Withdraw" ||
              value == "Order" ||
              value == "Income"
            );
          },
          message: "Only recharge and withdraw transaction will be reserved",
        },
      ],
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
