import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "popper.js";
//import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/componentCSS/base.css";
import "react-datepicker/dist/react-datepicker.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
