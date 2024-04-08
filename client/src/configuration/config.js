// website configuration

const clientUrl = import.meta.env.VITE_CLIENT_URL || window.location.origin;
const serverUrl = import.meta.env.VITE_SERVER_URL || window.location.origin;

const coincapApi = import.meta.env.VITE_COINCAP_API_KEY;

// firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBAyBAiGT6BzX21Mi5j5RJPPv1AUD3ha-s",
  authDomain: "aftaai-2024.firebaseapp.com",
  databaseURL:
    "https://aftaai-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aftaai-2024",
  storageBucket: "aftaai-2024.appspot.com",
  messagingSenderId: "187536802411",
  appId: "1:187536802411:web:113a8f2733a74749e8e72e",
  measurementId: "G-CZ9FTWTKXY",
};
const vapidKey =
  "BBj4wEvrquksFiqktwvuOetBNxfb2VMp6_lfkZvudlgar68P2CO76ttEKXgIOIWxkYIqQ1E6-cXpOPJoMQn2O6s";

export { clientUrl, serverUrl, coincapApi, vapidKey, firebaseConfig };
