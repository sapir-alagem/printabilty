import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Dropdown from "react-bootstrap/Dropdown";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Logo />
    </nav>
  );
}

export default Navbar;
