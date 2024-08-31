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
      // redirect to the page the dashboard
      // if role contains "company admin" redirect to /dashboard?companyId=companyId
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
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-4">
      <div className="row align-items-stretch g-lg-5 py-5">
        <div className="col-lg-7 d-flex flex-column align-items-center text-center bg-info border rounded border-dark p-4">
          <div className="column-content">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Welcome To
            </h1>
            <LogoBlackNoBackground />
            <p className="fs-4 text-black">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
            <h3 className="display-6 fw-bold lh-3 text-body-emphasis mb-3">
              Welcome Back,
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
            <button className="w-100 btn btn-lg btn-info" type="submit">
              Login
            </button>
            <div className="form-check" style={{ padding: "20px" }}>
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
            <small className="text-body-secondary">
              By clicking Sign up, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
