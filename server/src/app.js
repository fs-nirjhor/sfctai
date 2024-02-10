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
  origin: corsUrl,
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

// Routes
/* app.get("/", (req, res) => {
  res.send("Welcome to the STFAI Server");
});
 */
app.get("/test", (req, res) => {
  const text = req.query.text || "Welcome to the STFAI Server";
  res.status(200).send(`Server is working fine. ${text}`);
});

// using router
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/configuration", configurationRouter);

// ----deployment----
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/client/dist")));

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
