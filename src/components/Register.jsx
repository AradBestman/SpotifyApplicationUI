import React, { useState } from "react";
import axios from "axios";
import { validateRegister } from "../validation/registervalidtion";
import { Alert } from "@mui/material";

const Register = ({ setIsSignupActive }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    month: "",
    date: "",
    year: "",
  });
  const [errorState, setErrorState] = useState(null);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const errors = validateRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        month: formData.month,
        date: formData.date,
        year: formData.year,
      });
      console.log(errors);
      setErrorState(errors);
      const res = await axios.post(
        "http://localhost:5001/api/v1/users/register",
        formData
      );
      console.log(res.data);

      console.log(errors); // Log validation errors

      setIsSignupActive(false);
      console.log("Registration Response:", res); // Log registration response
    } catch (error) {
      console.error("Registration Error:", error); // Log registration error
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
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
      <span>or use your email for registration</span>
      <input
        type="text"
        placeholder="Name"
        onChange={handleChange}
        name="name"
      />
      {errorState && errorState.name && (
        <Alert severity="warning">{errorState.name}</Alert>
      )}
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
      <input
        type="text"
        placeholder="Gender"
        onChange={handleChange}
        name="gender"
      />
      {errorState && errorState.gender && (
        <Alert severity="warning">{errorState.gender}</Alert>
      )}
      <input
        type="text"
        placeholder="Day"
        onChange={handleChange}
        name="date"
      />
      {errorState && errorState.date && (
        <Alert severity="warning">{errorState.date}</Alert>
      )}
      <input
        type="text"
        placeholder="Year"
        onChange={handleChange}
        name="year"
      />
      {errorState && errorState.year && (
        <Alert severity="warning">{errorState.year}</Alert>
      )}
      <input
        type="text"
        placeholder="Month"
        onChange={handleChange}
        name="month"
      />
      {errorState && errorState.month && (
        <Alert severity="warning">{errorState.month}</Alert>
      )}
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default Register;
