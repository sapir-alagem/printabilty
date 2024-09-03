import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "#EFF7FF", overflow: "hidden" }}
    >
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{ marginLeft: "280px", display: "flex", flexDirection: "column", height: "100%" }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
