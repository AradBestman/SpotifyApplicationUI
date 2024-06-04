import React, { Fragment } from "react";
import MainComponent from "./Main/MainComponent";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import { getToken } from "../storageToken/storageToken";
import Main from "../components/Main";
import { useLocation, useNavigate } from "react-router-dom";
const LayOutComponent = ({ children }) => {
  const token = useSelector((state) => state.authSlice.token);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");
  return (
    <Fragment>
      {!isLoginPage ? <Nav /> : ""}
      {!isLoginPage ? <Main navigate={navigate} /> : ""}
      <MainComponent>{children}</MainComponent>
    </Fragment>
  );
};

export default LayOutComponent;
