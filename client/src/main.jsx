import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

// css files 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import ShowAlert from "./pages/shared/ShowAlert";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShowAlert />
    <RouterProvider router={router} />
  </React.StrictMode>
);
