import { getMessaging } from "firebase/messaging/sw";
import { app } from "./firebase.init";

const backgroundMessaging = getMessaging(app);

export { backgroundMessaging };