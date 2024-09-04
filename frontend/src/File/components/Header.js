import { title } from "process";
import React from "react";

export default function Header({ title, description }) {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#3799FA",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "2rem", color: "#fff" }}>
          {title}
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: "1.2rem", color: "#fff" }}>
          {description}
        </p>
      </header>
    </div>
  );
}
