import React from "react";

function Logo() {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/app_logo.png`}
      alt="Logo"
      width="30"
      height="30"
      className="d-inline-block align-top"
    />
  );
}

export default Logo;
