import React from "react";

export default function Header() {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#3799FA", // Light gray background color
          padding: "20px", // Padding inside the header
          borderRadius: "8px", // Rounded corners for a boxier look
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
          textAlign: "center", // Center text alignment
        }}
      >
        <h1 style={{ margin: "0", fontSize: "2rem", color: "#fff" }}>
          Welcome to Printability
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "1.2rem", color: "#fff" }}>
          Easily browse your files and upload them
        </p>
      </header>
    </div>
  );
}
