const admin = require("firebase-admin");

const serviceAccount = require("./aftaai-2024-firebase-adminsdk-2hr2w-62e98320de.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://aftaai-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const messaging = admin.messaging();

module.exports = { messaging };
