import { Outlet } from "react-router-dom";
import Footer from "./pages/shared/Footer";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <main className="max-w-4xl mx-auto">
        <div className="container mx-auto text-justify">
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
          transition={Zoom}
        />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
