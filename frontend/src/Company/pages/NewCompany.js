import React from "react";
import { useNavigate } from "react-router-dom";

const NewCompany = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/companies/new/form");
  };

  return (
    <div className="container">
      <h1>Join Our Service Today!</h1>
      <h2>Streamline Your Printing Services</h2>
      <p>
        Give your clients the ultimate convenience of printing documents
        directly from their personal devices.
      </p>

      <div className="section-divider"></div>

      <p>
        Our solution simplifies your workflow with an intuitive user interface,
        secure payment methods, and a comprehensive operational system.
      </p>

      <p>
        Say goodbye to hassle and hello to effortless income from printing
        services.
      </p>
      <button className="button" onClick={handleSignUp}>
        Sign Up Now
      </button>
    </div>
  );
};

export default NewCompany;
