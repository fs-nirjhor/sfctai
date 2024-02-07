import { Outlet } from "react-router-dom";
import Footer from "./pages/shared/Footer";

function App() {
  return (
    <>
      <main className="max-w-4xl mx-auto">
        <div className="container mx-auto px-4 text-justify">
        <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
