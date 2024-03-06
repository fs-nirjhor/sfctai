import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { vapidKey } from "./config";
import { toast } from "react-toastify";
import { foregroundMessaging } from "./foregroundMessaging";

const UseNotification = () => {
  const [deviceId, setDeviceId] = useState("");
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(foregroundMessaging, {
            vapidKey: vapidKey,
          });
          setDeviceId(token);
        } else {
          toast.error("Please enable permission for push notifications");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    requestPermission();
  }, []);

  return { deviceId };
};
export default UseNotification;
