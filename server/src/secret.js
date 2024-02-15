// all environment variables

require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3001;
const serverUrl = process.env.VITE_SERVER_URL;
const clientUrl = process.env.VITE_CLIENT_URL;
const databaseUrl = process.env.MONGODB_URL;
const corsUrl = [
  "http://localhost:5173",
  "http://localhost:3001",
  "https://sfctai.onrender.com",
  "http://sfctai.onrender.com",
];

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "jwtActivationKey";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "jwtAccessKey";
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "jwtRefreshKey";
const jwtResetPasswordKey =
  process.env.JWT_RESET_PASSWORD_KEY || "jwtResetPasswordKey";

const smtpUser = process.env.SMTP_USER || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";

const cloudinaryName = process.env.CLOUDINARY_NAME || "";
const cloudinaryKey = process.env.CLOUDINARY_KEY || "";
const cloudinarySecret = process.env.CLOUDINARY_SECRET || "";

module.exports = {
  serverPort,
  databaseUrl,
  jwtActivationKey,
  jwtAccessKey,
  jwtResetPasswordKey,
  jwtRefreshKey,
  smtpUser,
  smtpPassword,
  clientUrl,
  serverUrl,
  cloudinaryName,
  cloudinaryKey,
  cloudinarySecret,
  corsUrl,
};
