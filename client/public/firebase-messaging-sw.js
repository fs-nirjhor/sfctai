importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Initialize Firebase app
firebase.initializeApp(defaultConfig);
const messaging = firebase.messaging();

//Listens for background notifications
messaging.onBackgroundMessage((payload) => {
  //console.log("Received background message: ", payload);

  //customise notification
  const notificationTitle = payload.data?.title;
  const notificationOptions = {
    body: payload.data?.body,
    icon: payload.data?.icon || "/images/icon.png",
    badge: "/images/icon.png",
    click_action: `/my/chat/${payload.data?.client}`,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});