importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// "Default" Firebase configuration (to prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Initialize Firebase app
firebase.initializeApp(defaultConfig);

//Listens for background notifications
const handleBackgroundNotifications = () => {
  try {
    const isSupported = firebase.messaging.isSupported();
    if (isSupported) {
      const messaging = firebase.messaging();
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
          },
        };
        // send notification
        self.addEventListener("push", function (event) {
          event.waitUntil(
            self.registration.showNotification(
              notificationTitle,
              notificationOptions
            )
          );
        });
      });
      // add link on notification
      self.addEventListener("notificationclick", function (event) {
        //console.log(event)
        const link = event.notification?.data?.link;
        if (link) {
          event.notification.close();
          event.waitUntil(clients.openWindow(link));
        }
      });
    } //// end: if (messaging)
  } catch (error) {
    console.log(error.message);
  }
};

handleBackgroundNotifications();
