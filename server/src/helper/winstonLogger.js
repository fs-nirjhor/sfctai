const { createLogger, format, transports} = require("winston");
const { combine, colorize, simple, timestamp, prettyPrint } = format;
const path = require("path");
const { mainDirectory } = require("../config/config");

const logsFilePath = path.resolve(mainDirectory, "../logs");

const infoTransport = new transports.File({
  filename: `${logsFilePath}/combined.log`,
  level: "info",
  format: combine(
    timestamp({ format: "DD-MM-YYYY hh:mm:ss" }),
    prettyPrint()
  ),
  maxsize: 1048576, // 1MB in byte
  maxFiles: 3,
});
const errorTransport = new transports.File({
  filename: `${logsFilePath}/error.log`,
  level: "error",
  format: combine(timestamp({ format: "DD-MM-YYYY hh:mm:ss" }), prettyPrint()),
  maxsize: 1048576,
  maxFiles: 3,
});
const consoleTransport = new transports.Console({
  format: combine(
    colorize(),
    simple()
  ),
});

const logger = createLogger({
  transports: [consoleTransport, infoTransport, errorTransport],
});

module.exports = logger;
