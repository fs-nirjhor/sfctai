importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

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

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

//Listens for background notifications
messaging.onBackgroundMessage((payload) => {
  console.log( payload);
  // onclick handler
  //self.addEventListener('notificationclick', function(event) {
  //   event.notification.close();
  //   event.waitUntil(
  //     clients.openWindow(payload?.data?.link)
  //   );
  // }); 
  // //customise notification
  // const notificationTitle = payload.data?.title;
  // const notificationOptions = {
  //   body: payload.data?.body,
  //   icon: payload.data?.icon || "/images/icon.png",
  //   badge: payload.data?.icon || "/images/icon.png",
  //   click_action: payload.data?.link,
  // };
  // self.registration.showNotification(notificationTitle, notificationOptions)
});