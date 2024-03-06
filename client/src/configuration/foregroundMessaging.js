import { getMessaging, isSupported } from "firebase/messaging";
import { app } from "./firebase.init";

const foregroundMessaging = isSupported ? getMessaging(app) : null;

export { foregroundMessaging };