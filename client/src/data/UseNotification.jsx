import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { vapidKey } from "./config";
import { messaging } from "./firebase.init";
import { toast } from "react-toastify";

const UseNotification = () => {
  const [deviceId, setDeviceId] = useState("");
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: vapidKey,
          });
          setDeviceId(token);
        } else {
          toast.error("Permission denied for push notifications");
        }
      } catch (error) {
        toast.error("Error requesting notification permission:", error.message);
      }
    };

    requestPermission();
  }, []);

  return { deviceId };
};
export default UseNotification;
