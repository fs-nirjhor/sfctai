const admin = require("firebase-admin");


const serviceAccount = require("./sfctai-2024-firebase-adminsdk-49ky2-3d1feb1047.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sfctai-2024-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const messaging = admin.messaging();


module.exports = {messaging}