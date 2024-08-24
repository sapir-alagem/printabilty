import React from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar.js";

function Layout({ children }) {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage =
    location.pathname === "/Login" || location.pathname === "/login";
  return (
    <div className="app-layout">
      {!isLoginPage && <NavigationBar />}
      <div className="">{children}</div>
    </div>
  );
}

export default Layout;
