import { getMessaging } from "firebase/messaging";
import { app } from "./firebase.init";

const foregroundMessaging = getMessaging(app);

export { foregroundMessaging };