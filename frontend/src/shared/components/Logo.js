import React from "react";

function Logo() {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
      alt="Logo"
      width="100"
      height="50"
      className="d-inline-block align-top"
    />
  );
}

export default Logo;
