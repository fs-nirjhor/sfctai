import { getToken, getMessaging, isSupported, onMessage } from "firebase/messaging";
import { vapidKey } from "./config";
import { toast } from "react-toastify";
import { app } from "./firebase.init";
import NotificationToast from "../pages/shared/NotificationToast";

const foregroundMessaging = isSupported ? getMessaging(app) : null;

const UseNotification = () => {

    const requestToken = async () => {
      try {
        const fcmSupported = await isSupported();
        if (fcmSupported) {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const token = await getToken(foregroundMessaging, {
              vapidKey: vapidKey,
            });
            return token
          } else {
            toast.error("Please enable permission for push notifications");
            return null;
          }
        }
      } catch (error) {
        toast.error(error.message);
        return null;
      }
    };
    const handleForgroundMessaging = () => {
      try {
        const fcmSupported = isSupported();
        if (fcmSupported) {
          onMessage(foregroundMessaging, (payload) => {
            toast(<NotificationToast payload={payload} />);
          });
        }
      } catch (error) {
        console.log(error.message)
      }
    }

  return { requestToken, handleForgroundMessaging };
};
export default UseNotification;
