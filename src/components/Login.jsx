import React, { useState } from "react";
import axios from "axios";
import ROUTES from "../ROUTES";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../storageToken/storageToken";
import { useDispatch, useSelector } from "react-redux";
import authSlice, { authActions } from "../store/authSlice";
import { validateLogin } from "../validation/loginvalidtion";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState(null);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const errors = validateLogin({
        email: formData.email,
        password: formData.password,
      });
      console.log("LOGGGGG ERROR", errors);
      setErrorState(errors);
      const res = await axios.post(
        "http://localhost:5001/api/v1/users/login",
        formData
      );
      storeToken(res.data.Jwt, true);
      toast("You logged in successfully 👌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      dispatch(authActions.login(jwtDecode(res.data.Jwt)));

      navigate(ROUTES.CATEGORIES);
      console.log(res);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h1>Sign In</h1>
      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>
      <span>or use your email password</span>
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
      />
      {errorState && errorState.email && (
        <Alert severity="warning">{errorState.email}</Alert>
      )}
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="password"
      />
      {errorState && errorState.password && (
        <Alert severity="warning">{errorState.password}</Alert>
      )}
      <a href="#">Forget Your Password?</a>
      <button onClick={handleSubmit}>Sign In</button>
    </>
  );
};

export default Login;
