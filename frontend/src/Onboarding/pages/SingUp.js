import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const SignUp = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [email, setemail] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleSignUpClick = async () => {
    try {
      let response = await axios.post("/companies", {
        name: CompanyName,
        email: email,
      });

      const companyId = response.data.companyId;
      navigate(
        "/onboarding?companyId=" +
          companyId +
          "&email=" +
          email +
          "&name=" +
          CompanyName
      );
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

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row p-0">
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white p-4 p-md-5"
        style={{ backgroundColor: "#3799FA", flexBasis: "50%" }}
      >
        <h1 className="display-4 fw-bold lh-1 text-center mb-3">Welcome To</h1>
        <img src="/assets/white_logo.svg" alt="Logo" className="img-fluid" />
        <p className="fs-5 text-center mt-4" style={{ maxWidth: "400px" }}>
          Empower your business and elevate customer convenience with our
          mobile-friendly, self-service printing solution.
        </p>
      </div>
      <div
        className="d-flex justify-content-center align-items-center p-4"
        style={{ flexBasis: "50%", backgroundColor: "white" }}
      >
        <form
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUpClick();
          }}
          style={{ maxWidth: "400px" }}
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
              onChange={(e) => setemail(e.target.value)}
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
    </div>
  );
};

export default SignUp;
