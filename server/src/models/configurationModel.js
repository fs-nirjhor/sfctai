const { model, Schema } = require("mongoose");

const configurationSchema = new Schema(
    {
        transferAddress: {
            type: String,
            trim: true,
            required: [true, "Transfer Address is required"]
        },
        minimumRecharge: {
            type: Number,
            required: [true, "Minimum recharge is required"],
            min: 0
        },
        minimumWithdraw: {
            type: Number,
            required: [true, "Minimum withdraw is required"],
            min: 0
        },
        withdrawFee: {
            type: Number,
            required: [true, "Withdraw fee is required"],
            min: 0
        },
        monthlyProfit: {
            type: Number,
            required: [true, "Monthly profit is required"],
            min: 0,
        },
        orderPerDay: {
            type: Number,
            required: [true, "Trade per day is required"],
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value"
            },
        },
        level1Commission: {
            type: Number,
            required: [true, "Level 1 commission is required"],
            min: 0,
        },
        level2Commission: {
            type: Number,
            required: [true, "Level 2 commission is required"],
            min: 0,
        },
        level3Commission: {
            type: Number,
            required: [true, "Level 3 commission is required"],
            min: 0,
        },
    },
    { timestamps: true }
);

const Configuration = model("Configuration", configurationSchema);

module.exports = Configuration;