const { model, Schema } = require("mongoose");

const positiveAmount = {
  type: Number,
  min: [0, "Too less amount"],
  default: 0,
};
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
    amount: positiveAmount,
    // without fee
    withDrawAmount: positiveAmount,
    photo: { type: String },
    // order
    estimateRevenue: positiveAmount,
    coin: {
      type: String,
    },
    isPending: {
      type: Boolean,
      default: true,
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
              value == "Bonus" ||
              value == "Reduce"
            );
          },
          message: "Invalid category",
        },
      ],
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
