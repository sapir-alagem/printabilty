import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoBlackNoBackground from '../components/Logo';

const Login = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/onboarding');
  };
  
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-4">
      <div className="row align-items-stretch g-lg-5 py-5">
        <div className="col-lg-7 d-flex flex-column align-items-center text-center bg-info border rounded border-dark p-4">
            {/* <Background className="background-svg"/> */}
          <div className="column-content">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Welcome To
            </h1>
            <LogoBlackNoBackground/>
            <p className="fs-4 text-black">
              Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.
            </p>
          </div>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={(e) => { e.preventDefault(); handleSignUpClick(); }}>
            <h3 className="display-6 fw-bold lh-3 text-body-emphasis mb-3">
              Welcome Back,
            </h3>
            <p>Dont have an account? <a href="/SingUp">Sing Up</a></p>
            <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>
            <button className="w-100 btn btn-lg btn-info" type="submit">Login</button>
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
