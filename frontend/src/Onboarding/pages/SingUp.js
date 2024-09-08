import React, { useState } from "react";
import axios from "../../api/axios";
import Onboarding from "./OnboardingForm.js";
import Typography from "@mui/material/Typography";

const SignUp = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const handleSignUpClick = async () => {
    try {
      let response = await axios.post("/companies", {
        name: CompanyName,
        email: email,
      });

      setCompanyId(response.data.companyId);
      setShowPopup(true);
    } catch (error) {
      setAlert({
        message: error.response?.data?.error || "An error occurred",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  const popupStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    maxWidth: "900px",
    width: "100%",
    textAlign: "center",
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row p-0">
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white p-4 p-md-5"
        style={
          showPopup
            ? { backgroundColor: "#3799FA", filter: "blur(5px)" }
            : { backgroundColor: "#3799FA", flexBasis: "50%" }
        }
      >
        <h1 className="display-4 fw-bold lh-1 text-center mb-3">Welcome To</h1>
        <img src="/assets/white_logo.svg" alt="Logo" className="img-fluid" />
        <p className="lead text-center mt-4" style={{ maxWidth: "500px" }}>
          Empower your business and elevate customer convenience with our
          mobile-friendly, self-service printing solution.
        </p>
      </div>
      <div
        className="d-flex justify-content-center align-items-center p-4"
        style={
          showPopup
            ? { filter: "blur(5px)" }
            : { backgroundColor: "white", flexBasis: "50%" }
        }
      >
        <form
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUpClick();
          }}
          style={{ maxWidth: "500px" }}
        >
          <h3 className="display-6 fw-bold lh-3 text-body-emphasis mb-3">
            Let's get started
          </h3>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>

          {alert.message && (
            <div
              className={`alert alert-${alert.type} alert-dismissible fade show`}
              role="alert"
            >
              {alert.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Company Name"
              required
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label htmlFor="floatingInput">Company Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <button
            className="w-100 btn btn-lg text-white"
            style={{ backgroundColor: "#3799FA" }}
            type="submit"
          >
            Sign up
          </button>
          <hr className="my-4" />
          <small className="text-muted">
            By clicking Sign up, you agree to the terms of use.
          </small>
        </form>
      </div>

      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <Typography variant="h5" gutterBottom>
              Complete Your Setup in Just a Few Steps
            </Typography>
            <Onboarding companyId={companyId} email={email} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
