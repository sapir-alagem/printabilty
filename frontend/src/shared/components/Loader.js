import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <div
      class="spinner-grow text-primary"
      role="status"
      style={{ width: "3rem; height: 3rem;" }}
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
