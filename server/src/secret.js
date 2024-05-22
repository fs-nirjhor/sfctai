// all environment variables

require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3001;
const serverUrl = process.env.VITE_SERVER_URL;
const clientUrl = process.env.VITE_CLIENT_URL;
const databaseUrl = process.env.MONGODB_URL;
const corsUrl = [
  "http://localhost:5173",
  "http://localhost:3001",
  "https://aftaai.onrender.com",
  "http://aftaai.onrender.com",
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

// firebase
const firebaseProjectId = process.env.VITE_FIREBASE_PROJECT_ID || "";
const firebaseDatabase = process.env.VITE_FIREBASE_DATABASE_URL || "";
const firebasePrivateKeyId = process.env.FIREBASE_PRIVATE_KEY_ID || "";
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY || "";
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL || "";
const firebaseClientId = process.env.FIREBASE_CLIENT_ID || "";
const firebaseClientX509CertUrl =
  process.env.FIREBASE_CLIENT_X509_CERT_URL || "";

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
  firebaseProjectId,
  firebaseDatabase,
  firebasePrivateKeyId,
  firebasePrivateKey,
  firebaseClientEmail,
  firebaseClientId,
  firebaseClientX509CertUrl,
};
