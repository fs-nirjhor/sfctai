const admin = require("firebase-admin");

//const serviceAccount = require("./aftaai-2024-firebase-adminsdk-2hr2w-62e98320de.json");
const {
  firebaseDatabase,
  firebasePrivateKeyId,
  firebasePrivateKey,
  firebaseClientEmail,
  firebaseClientId,
  firebaseClientX509CertUrl,
  firebaseProjectId,
} = require("../secret");

const serviceAccount = {
  type: "service_account",
  project_id: firebaseProjectId,
  private_key_id: firebasePrivateKeyId,
  private_key: firebasePrivateKey,
  client_email: firebaseClientEmail,
  client_id: firebaseClientId,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: firebaseClientX509CertUrl,
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseDatabase,
});

const messaging = admin.messaging();

module.exports = { messaging };
