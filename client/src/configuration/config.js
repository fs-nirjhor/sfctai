// website configuration

export const clientUrl =
  import.meta.env.VITE_CLIENT_URL || window.location.origin;
export const serverUrl =
  import.meta.env.VITE_SERVER_URL || window.location.origin;

export const coincapApi = import.meta.env.VITE_COINCAP_API_KEY;

// firebase configuration

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BACKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
export const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
