import React, { useRef, useState, useEffect } from "react";
import LogoBlackNoBackground from "../components/Logo";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const userRef = useRef(null);
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      const companyId = response?.data?.companyId;

      setAuth({ user, role, accessToken, companyId });
      setUser("");
      setPwd("");

      if (role.includes("company admin")) {
        navigate(`/companies/${companyId}/dashboard`, { replace: true });
      } else if (role.includes("super admin")) {
        navigate("/companies", { replace: true });
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No response from server");
      } else if (error.response?.status === 404) {
        setErrMsg("User not found");
      } else if (error.response?.status === 401) {
        setErrMsg("Invalid username or password");
      } else {
        setErrMsg("An error occurred");
      }
      if (errRef.current) {
        errRef.current.focus(); // Ensure the ref is attached before calling focus
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column flex-md-row p-0">
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white p-4 p-md-5"
        style={{ backgroundColor: "#3799FA", flexBasis: "50%" }}
      >
        <h1 className="display-4 fw-bold lh-1 text-center mb-3">Welcome Back,</h1>
        <img src="/assets/white_logo.svg" alt="Logo" className="img-fluid" />
        <p className="fs-5 text-center mt-4" style={{ maxWidth: "400px" }}>
          Log in to continue managing your business and enhancing customer convenience.
        </p>
      </div>
      <div
        className="d-flex justify-content-center align-items-center p-4"
        style={{ flexBasis: "50%", backgroundColor: "white" }}
      >
        <form
          className="w-100"
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px" }}
        >
          <h3 className="display-6 fw-bold lh-3 text-body-emphasis mb-3">
            Login to your account
          </h3>
          <p>
            Don’t have an account? <a href="/">Sign Up</a>
          </p>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={userRef}
              required
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              onChange={(e) => setPwd(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button
            className="w-100 btn btn-lg text-white"
            style={{ backgroundColor: "#3799FA" }}
            type="submit"
          >
            Login
          </button>
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="trustDevice"
              onChange={togglePersist}
              checked={persist}
            />
            <label className="form-check-label" htmlFor="trustDevice">
              Trust this device
            </label>
          </div>
          <hr className="my-4" />
          <small className="text-muted">
            By clicking Login, you agree to the terms of use.
          </small>
          <p
            ref={errRef}
            tabIndex="-1"
            aria-live="assertive"
            className="text-danger mt-3"
          >
            {errMsg}
          </p>
        </form>
      </div>
    </div>
  );

};

export default Login;
