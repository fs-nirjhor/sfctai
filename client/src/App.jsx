import { Outlet } from "react-router-dom";
import Footer from "./pages/shared/Footer";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
