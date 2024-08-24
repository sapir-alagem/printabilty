import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Extract query parameters
  const companyEmail = params.get("companyEmail");
  const companyName = params.get("companyName");

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Congratulations {companyName}!</h1>
      <h2>You have successfully registered.</h2>
      <p>
        A download link has been sent to the following email: {companyEmail}.
      </p>
      <button className="button" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default RegistrationSuccess;
