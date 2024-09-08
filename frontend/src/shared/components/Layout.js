import React from "react";
import Sidebar from "./Sidebar";
import Hamburger from "./Hamburger";
import { isMobile } from "react-device-detect";

function Layout({ children }) {
  const Mobile = isMobile;

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#EFF7FF",
        overflow: "hidden",
      }}
    >
      {Mobile ? <Hamburger /> : <Sidebar />}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: Mobile ? "0" : "280px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
