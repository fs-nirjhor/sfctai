import { Outlet } from "react-router-dom";
import Footer from "./pages/shared/Footer";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePreventZoom from "./pages/shared/UsePreventZoom";
import NotificationToast from "./pages/shared/NotificationToast";
import { onMessage } from "firebase/messaging";
//import { onBackgroundMessage } from "firebase/messaging/sw";
//import { backgroundMessaging } from "./data/backgroundMessaging";
import { foregroundMessaging } from "./data/foregroundMessaging";

function App() {
  onMessage(foregroundMessaging, (payload) => {
    console.log(payload);
    toast(<NotificationToast payload={payload} />);
  });
  /* onBackgroundMessage(backgroundMessaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
  }); */
  usePreventZoom();
  return <>
    <main className="max-w-4xl mx-auto lining-nums">
      <div className="container mx-auto text-justify">
      <Outlet />
      <ToastContainer
        position="top-center"
        toastClassName="font-serif"
        className="top-1/2"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
      />
      </div>
      <Footer />
    </main>
  </>;
}

export default App;
