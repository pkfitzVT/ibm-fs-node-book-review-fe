// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";

/* 1️⃣  Bootstrap’s compiled CSS  */
import "bootstrap/dist/css/bootstrap.min.css";

/* 2️⃣  (Optional) your own tweaks AFTER Bootstrap so you can override it */
import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
