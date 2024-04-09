const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const {
  createRandomString,
  createRandomNumber,
} = require("../helper/createRandom");
const { defaultUserImagePath } = require("../config/config");

const positiveAmount = {
  type: Number,
  min: [0, "Too less amount"],
  default: 0,
};
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
      minLength: [6, "At least 6 characters"],
      maxLength: [32, "At least 32 characters"],
      set: (v) => bcrypt.hashSync(v, 10),
    },
    withdrawalPassword: {
      type: String,
      required: [true, "Withdrawal password is required"],
      trim: true,
      minLength: [6, "At least 6 characters"],
      maxLength: [32, "At least 32 characters"],
      set: (v) => bcrypt.hashSync(v, 10),
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minLength: [6, "At least 6 characters"],
      maxLength: [18, "At least 18 characters"],
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
      balance: positiveAmount,
      // income
      todaysIncome: positiveAmount,
      totalIncome: positiveAmount,
      // team income
      todaysTeamIncome: positiveAmount,
      totalTeamIncome: positiveAmount,
      // recharge
      todaysRecharge: positiveAmount,
      totalRecharge: positiveAmount,
      // withdraw
      todaysWithdraw: positiveAmount,
      totalWithdraw: positiveAmount,
      // orders
      todaysOrder: positiveAmount,
      totalOrder: positiveAmount,
      todaysOrderAmount: positiveAmount,
      totalOrderAmount: positiveAmount,
      isOrderPending: {
        type: Boolean,
        default: false,
      },
      totalBonus: positiveAmount,
      totalReduce: positiveAmount,
      lastResetTimestamp: { type: Date, default: Date.now },
    },
    authentication: {
      isAuthenticated: {
        type: Boolean,
        default: false,
      },
      frontPhoto: {
        type: String,
        default: "",
      },
      backPhoto: {
        type: String,
        default: "",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    canMessage: {
      type: Boolean,
      default: true,
    },
    canTrade: {
      type: Boolean,
      default: true,
    },
    canWithdraw: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
