// Server for SFCTAI Project

const createHttpError = require("http-errors");
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./helper/winstonLogger");
const { serverPort, serverUrl } = require("./secret");
const server = require("./socket");

// listening server on port
server.listen(serverPort, async () => {
  try {
    logger.info(`SFCTAI server listening on ${serverPort}`);
    await connectDB();
  } catch (error) {
    logger.error(error.message);
  }
});
