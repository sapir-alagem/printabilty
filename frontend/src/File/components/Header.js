import { title } from "process";
import React from "react";

export default function Header({ title, description }) {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#3799FA", // Light gray background color
          padding: "20px", // Padding inside the header
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
          textAlign: "center", // Center text alignment
        }}
      >
        <h1 style={{ margin: "0", fontSize: "2rem", color: "#fff" }}>
          {title}
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "1.2rem", color: "#fff" }}>
          {description}
        </p>
        {/* <h1 style={{ margin: "0", fontSize: "2rem", color: "#fff" }}>
          Welcome to Printability
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "1.2rem", color: "#fff" }}>
          Easily browse your files and upload them
        </p> */}
      </header>
    </div>
  );
}
