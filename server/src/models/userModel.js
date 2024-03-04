const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const {
  createRandomString,
  createRandomNumber,
} = require("../helper/createRandom");
const { defaultUserImagePath } = require("../config/config");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: [3, "User name must have at least 3 characters"],
      maxLength: [10, "User name must have at most 10 characters"],
    },
    loginPassword: {
      type: String,
      required: [true, "Login password is required"],
      trim: true,
      set: (v) => bcrypt.hashSync(v, 10),
    },
    withdrawalPassword: {
      type: String,
      required: [true, "Withdrawal password is required"],
      trim: true,
      set: (v) => bcrypt.hashSync(v, 10),
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    dateOfBirth: {
      type: String,
      trim: true,
      default: "",
    },
    avatar: {
      type: String,
      trim: true,
      default: defaultUserImagePath,
    },
    deviceId: {
      type: [String],
      default: [],
    },
    trc20Address: {
      type: String,
      trim: true,
      default: "",
      validate: [
        {
          validator: async function (value) {
            if (value !== "") {
              const count = await this.model.countDocuments({
                trc20Address: value,
              });
              return count <= 3;
            }
            return true;
          },
          message: "Only 3 account allowed with the same trc20 address",
        },
      ],
      sparse: true,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    userId: {
      type: String,
      default: function () {
        return createRandomNumber(7);
      },
      required: [true, "Invitation code is required"],
      unique: true,
    },
    invitationCode: {
      type: String,
      default: function () {
        return createRandomString(6);
      },
      required: [true, "Invitation code is required"],
      unique: true,
    },
    team: {
      level1: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
      level2: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
      level3: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    },
    transaction: {
      balance: { type: Number, min: 0, default: 0 },
      // income
      todaysIncome: { type: Number, min: 0, default: 0 },
      totalIncome: { type: Number, min: 0, default: 0 },
      // team income
      todaysTeamIncome: { type: Number, min: 0, default: 0 },
      totalTeamIncome: { type: Number, min: 0, default: 0 },
      // recharge
      todaysRecharge: { type: Number, default: 0 },
      totalRecharge: { type: Number, default: 0 },
      // withdraw
      todaysWithdraw: { type: Number, min: 0, default: 0 },
      totalWithdraw: { type: Number, min: 0, default: 0 },
      // orders
      todaysOrder: { type: Number, min: 0, default: 0 },
      totalOrder: { type: Number, min: 0, default: 0 },
      todaysOrderAmount: { type: Number, min: 0, default: 0 },
      totalOrderAmount: { type: Number, min: 0, default: 0 },
      isOrderPending: {
        type: Boolean,
        default: false,
      },
      lastResetTimestamp: { type: Date, default: Date.now },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
