import { getToken, getMessaging, onMessage } from "firebase/messaging";
import { vapidKey } from "./config";
import { toast } from "react-toastify";
import { app } from "./firebase.init";
import NotificationToast from "../pages/shared/NotificationToast";

const foregroundMessaging = getMessaging(app);

export const requestToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(foregroundMessaging, {
        vapidKey: vapidKey,
      });
      return token;
    } else {
      return null;
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export const handleForgroundMessaging = async () => {
  try {
    await onMessage(foregroundMessaging, (payload) => {
      toast(<NotificationToast payload={payload} />);
    });
  } catch (error) {
    console.log(error.message);
  }
};
