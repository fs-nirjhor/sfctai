// website configuration

const clientUrl = import.meta.env.VITE_CLIENT_URL || window.location.origin;
const serverUrl = import.meta.env.VITE_SERVER_URL || window.location.origin; 

const coincapApi = import.meta.env.VITE_COINCAP_API_KEY;

// firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDQkMDRZ3d8EIp_lzn-QYWDw7qgtevs30c",
  authDomain: "sfctai-2024.firebaseapp.com",
  databaseURL: "https://sfctai-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sfctai-2024",
  storageBucket: "sfctai-2024.appspot.com",
  messagingSenderId: "435616392304",
  appId: "1:435616392304:web:d1570a422a8d4e742fc0b5",
  measurementId: "G-Z7M6Z1E6ME"
};
const vapidKey = "BF7GB4SD5YGq8VPCAJ6uVHJ0ZT-__0Ox2RJGa5LVaL_sYwten4TMw11BG3w4FNrkBFjeAZ7OSUF9KYB7ESC3AJc";


export {
  clientUrl,
  serverUrl,
  coincapApi,
  vapidKey,
  firebaseConfig
}
