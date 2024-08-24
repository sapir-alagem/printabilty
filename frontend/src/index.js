import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./auth/components/authProvider";
import { CheckoutProvider } from "./Payments/CheckoutContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; // for icons
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CheckoutProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </CheckoutProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
