const cron = require("node-cron");
const createHttpError = require("http-errors");
const logger = require("../helper/winstonLogger");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Configuration = require("../models/configurationModel");
const { findItemById } = require("./findItem");

// auto approve order scheduler "*/5 * * * *"
const orderScheduler = cron.schedule("*/5 * * * *", async () => {
  try {
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
    // approved orders
    const approvedOrders = await Transaction.find({
      category: "Order",
      createdAt: { $lte: tenMinutesAgo.toISOString() },
      isApproved: false,
    });

    if (approvedOrders.length) {
      const updateOptions = {
        new: true,
        runValidators: true,
        context: "query",
      };
      // approve order
      const ordersToApproved = await Transaction.updateMany(
        {
          category: "Order",
          createdAt: { $lte: tenMinutesAgo.toISOString() },
          isApproved: false,
        },
        { isApproved: true },
        updateOptions
      );

      if (ordersToApproved.modifiedCount) {
        // update user on order successs
        for (const order of approvedOrders) {
          const orderAmount = Number(order.amount);
          const estimateRevenue = Number(order.estimateRevenue);
          // site configuration
          const configuration = await Configuration.findOne();
          if (!configuration) {
            throw createHttpError(400, "Failed to find configuration on order");
          }
          // find client
          const client = await findItemById(User, order.client);
          if (!client) {
            throw createHttpError(400, "Failed to find client on order");
          }
          // update clients transaction
          const clientUpdates = {
            $inc: {
              "transaction.balance": orderAmount,
              "transaction.todaysIncome": estimateRevenue,
              "transaction.totalIncome": estimateRevenue,
            },
            $set: {
              "transaction.isOrderPending": false,
            },
          };
          const updatedClient = await User.findByIdAndUpdate(
            order.client,
            clientUpdates,
            updateOptions
          );

          if (!updatedClient) {
            throw createHttpError(400, "Failed to update client on order");
          }

          // commissions
          const inviter1Commission =
            estimateRevenue * (Number(configuration.level1Commission) / 100);
          const inviter2Commission =
            estimateRevenue * (Number(configuration.level2Commission) / 100);
          const inviter3Commission =
            estimateRevenue * (Number(configuration.level3Commission) / 100);

          // Update inviter1 transaction
          const inviter1Updates = {
            $inc: {
              "transaction.balance": inviter1Commission,
              "transaction.todaysTeamIncome": inviter1Commission,
              "transaction.totalTeamIncome": inviter1Commission,
            },
          };
          const updatedInviter1 = await User.findByIdAndUpdate(
            updatedClient.invitedBy,
            inviter1Updates
          );
          if (!updatedInviter1) {
            throw createHttpError(400, "Failed to update inviter 1 on order");
          }

          // Update inviter2 transaction
          const inviter2Updates = {
            $inc: {
              "transaction.balance": inviter2Commission,
              "transaction.todaysTeamIncome": inviter2Commission,
              "transaction.totalTeamIncome": inviter2Commission,
            },
          };
          const updatedInviter2 = await User.findByIdAndUpdate(
            updatedInviter1.invitedBy,
            inviter2Updates,
            updateOptions
          );
          if (!updatedInviter2) {
            throw createHttpError(400, "Failed to update inviter 2 on order");
          }

          // Update inviter 3 transaction
          const inviter3Updates = {
            $inc: {
              "transaction.balance": inviter3Commission,
              "transaction.todaysTeamIncome": inviter3Commission,
              "transaction.totalTeamIncome": inviter3Commission,
            },
          };
          const updatedInviter3 = await User.findByIdAndUpdate(
            updatedInviter2.invitedBy,
            inviter3Updates,
            updateOptions
          );
          if (!updatedInviter3) {
            throw createHttpError(400, "Failed to update inviter 3 on order");
          }
        } // for
      } // if modifiedCount
    } // if orders length
    logger.info(`${approvedOrders.length} orders approved.`);
  } catch (error) {
    console.log(error);
    throw createHttpError(400, `Approve order failed: ${error.message}`);
  }
});

// auto reset today transaction
const todayScheduler = cron.schedule("0 0 0/3 * * *", async () => {
  try {
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };
    const currentTime = new Date();
    const updateResult = await User.updateMany(
      {
        $or: [
          { "transaction.lastResetTimestamp": { $exists: false } },
          {
            "transaction.lastResetTimestamp": {
              $ne: currentTime.toDateString(),
            },
          },
        ],
      },
      {
        $set: {
          "transaction.todaysIncome": 0,
          "transaction.todaysTeamIncome": 0,
          "transaction.todaysRecharge": 0,
          "transaction.todaysWithdraw": 0,
          "transaction.todaysOrder": 0,
          "transaction.todaysOrderAmount": 0,
          "transaction.lastResetTimestamp": currentTime.toDateString(),
        },
      }, 
      updateOptions
    );
    logger.info(`${updateResult.modifiedCount || 0} todays data reset.`);
  } catch (error) {
    console.log(error);
    throw createHttpError(400, `Reset todays failed: ${error.message}`);
  }
});

module.exports = { orderScheduler, todayScheduler };
