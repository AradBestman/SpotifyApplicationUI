import React, { useState } from "react";
import "./Login.css";
import Register from "../components/Register";
import Login from "../components/Login";

const LoginRegisterPage = () => {
  const [isSignupActive, setIsSignupActive] = useState(true);

  const handleToggle = () => {
    setIsSignupActive(!isSignupActive);
  };

  return (
    <div
      className={`container ${isSignupActive ? "active" : ""}`}
      id="container"
    >
      <div
        className={`form-container ${isSignupActive ? "sign-up" : "sign-in"}`}
      >
        <div className="login-logout-container">
          {isSignupActive ? (
            <Register setIsSignupActive={setIsSignupActive} />
          ) : (
            <Login />
          )}
        </div>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button
              className={isSignupActive ? "" : "hidden"}
              onClick={handleToggle}
              id="login"
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome, Friend!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button
              className={isSignupActive ? "hidden" : ""}
              onClick={handleToggle}
              id="register"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
