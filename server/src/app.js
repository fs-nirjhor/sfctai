// import
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const { xss } = require("express-xss-sanitizer");
const { rateLimit } = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");
const authRouter = require("./routers/authRouter");
const { corsUrl } = require("./secret");
const transactionRouter = require("./routers/transactionRouter");
const configurationRouter = require("./routers/configurationRouter");
const path = require("path");

// initialize
const app = express();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 1000,
  legacyHeaders: false,
  message: "Too many requests. \n Please try again later",
});
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
//app.use(limiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

// using router
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/configuration", configurationRouter);

// Routes
/* app.get("/", (req, res) => {
  res.send("Welcome to the SFCTAI Server");
});
 */

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/client/dist")));

// download app
app.get("/api/download-app", async (req, res, next) => {
  const relativeFilePath = './assets/SFCAI.apk';
  const appDirectory = path.dirname(require.main.filename);
  const absoluteFilePath = path.resolve(appDirectory, relativeFilePath);

  try {
     res.download(absoluteFilePath, (err) => {
      if (err) {
       createHttpError(404, err.message)
       next(err);
      } 
    });
  } catch (error) {
    next(error);
  }
});

// ----Logs----
app.get("/api/logs", (req, res) => {
  const logsPath = `${path.resolve()}/logs/combined.log`
  res.sendFile(logsPath, (err) => {
    if (err) {
      createHttpError(404, err.message)
      res.status(404).send("Failed to show logs");
    }
  })
});

// test server
app.get("/test", (req, res) => {
  const text = req.query.text || "Welcome to the SFCTAI Server";
  res.status(200).send(`Server is working fine. ${text}`);
});

// ----Deployment----
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"))
);

// error handler
app.use((req, res, next) => {
  next(createHttpError(404, "Route not found"));
});
app.use((err, req, res, next) => {
  const { status, message } = err;
  return errorResponse(res, { statusCode: status, message });
});

module.exports = app;
