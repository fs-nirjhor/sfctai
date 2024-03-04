const createHttpError = require("http-errors");
const { messaging } = require("../config/firebase.init");

// Registration tokens must be an array or string
// topic must be an string

const subscribeToNotification = async (registrationTokens, topic, isAdmin) => {
  try {
    await messaging.subscribeToTopic(registrationTokens, topic);
    if (isAdmin) {
      await messaging.subscribeToTopic(registrationTokens, "admin");
    } else {
      await messaging.subscribeToTopic(registrationTokens, "client");
    }
  } catch (error) {
    throw createHttpError(400, error.message);
  }
};

const unsubscribeFromNotification = async (registrationTokens, topic, isAdmin) => {
  try {
    await messaging.unsubscribeFromTopic(registrationTokens, topic);
    if (isAdmin) {
      await messaging.unsubscribeFromTopic(registrationTokens, "admin");
    } else {
      await messaging.unsubscribeFromTopic(registrationTokens, "client");
    }
  } catch (error) {
    throw createHttpError(400, error.message);
  }
};

module.exports = { subscribeToNotification, unsubscribeFromNotification };
