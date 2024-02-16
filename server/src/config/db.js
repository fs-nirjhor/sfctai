// MongoDB connection with Mongoose 

const mongoose = require("mongoose");
const { databaseUrl } = require("../secret");
const logger = require("../helper/winstonLogger");
const {orderScheduler, todayScheduler} = require("../services/scheduler");
const createHttpError = require("http-errors");

const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info("Database connected successfully");
    mongoose.connection.on("error", (error) => {
      logger.error(`Mongoose Connection: ${error.message}`);
      createHttpError(500, error.message);
    });
    // start scheduler 
     orderScheduler.start();
     todayScheduler.start();
  } catch (error) {
    logger.error(`Database Connection: ${error.message}`);
    throw createHttpError(500, error.message);
  }
};

module.exports = connectDB;
