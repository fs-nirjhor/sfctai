importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

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
  databaseURL:
    "https://sfctai-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sfctai-2024",
  storageBucket: "sfctai-2024.appspot.com",
  messagingSenderId: "435616392304",
  appId: "1:435616392304:web:d1570a422a8d4e742fc0b5",
  measurementId: "G-Z7M6Z1E6ME",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

//Listens for background notifications
const handleBackgroundNotifications = () => {
  try {
    const messaging = firebase.messaging();
    console.log(messaging)
    if (messaging) {
      // handle background notifications
      messaging.onBackgroundMessage((payload) => {
        //customise notification
        const data = payload?.data;
        const notificationTitle = data?.title;
        const notificationOptions = {
          body: data?.body,
          image: data?.image,
          icon: data?.icon || "/images/icon.png",
          badge: data?.icon || "/images/icon.png",
          tag: data?.tag,
          timestamp: Math.floor(Date.now()),
          renotify: true,
          data: {
            link: data?.link,
          }
        };
        // send notification 
        self.registration.showNotification(notificationTitle, notificationOptions);
      });
    }
  } catch (error) {
    console.log(error.message)
  }
};

handleBackgroundNotifications();

// add link on notification
self.addEventListener("notificationclick", function (event) {
  //console.log(event)
  const link = event.notification?.data?.link
  if (link) {
    event.notification.close();
    event.waitUntil(clients.openWindow(link));
  }
});

