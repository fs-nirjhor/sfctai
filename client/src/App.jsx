import { Outlet } from "react-router-dom";
import Footer from "./pages/shared/Footer";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePreventZoom from "./pages/shared/UsePreventZoom";
import { useEffect } from "react";
import { isSupported } from "firebase/messaging";

function App() {
  usePreventZoom();
  useEffect(() => {
    // get device id for notification
    (async () => {
      try {
        const fcmSupport = await isSupported();
        if (fcmSupport) {
          const { handleForgroundMessaging } = await import(
            "./configuration/UseNotification.jsx"
          );
          handleForgroundMessaging();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <main className="max-w-4xl mx-auto lining-nums">
        <div className="container mx-auto text-justify">
          <Outlet />
          <ToastContainer
            position="top-center"
            toastClassName="m-3 rounded shadow text-center bg-black text-white bg-opacity-60"
            className="top-1/2"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            closeButton={false}
            icon={false}
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
    </>
  );
}

export default App;
