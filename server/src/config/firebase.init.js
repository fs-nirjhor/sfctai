const admin = require("firebase-admin");

const serviceAccount = require("./aftaai-2024-firebase-adminsdk-2hr2w-62e98320de.json");
const { firebaseDatabase } = require("../secret");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseDatabase,
});

const messaging = admin.messaging();

module.exports = { messaging };
