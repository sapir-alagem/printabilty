import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">{children}</div>
    </div>
  );
}

export default Layout;
