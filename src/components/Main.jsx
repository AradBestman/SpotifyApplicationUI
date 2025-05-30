import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
  useLocation,
  useFormAction,
} from "react-router-dom";
import { authActions } from "../store/authSlice";
import { getToken } from "../storageToken/storageToken";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ROUTES from "../ROUTES";

const Main = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTxt, setSearchTxt] = useState("");
  const [hover, setHover] = useState(false);
  console.log("hover state:", hover);
  const TOKEN = "token";
  const handleNavigate = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    const token = getToken();

    if (token) {
      localStorage.removeItem(TOKEN);
      sessionStorage.removeItem(TOKEN);
    }

    console.log(loggedIn);
    toast("You logged out successfully ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(authActions.logout());
    navigate("/login");
  };

  const goToPreviousPage = () => {
    navigate(-1);
  };

  const goToNextPage = () => {
    navigate(1);
  };

  const handleTxtChange = (e) => {
    const searchText = e.target.value;
    setSearchTxt(searchText);
    navigate(`${ROUTES.SEARCH}?filter=${searchText}`);
  };

  const { pathname } = useLocation();

  return (
    <div className="mainUpper">
      <div className="upperNav">
        <div className="arrows">
          <IconButton style={{ color: "white" }} onClick={goToPreviousPage}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton style={{ color: "white" }} onClick={goToNextPage}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>

        {pathname.includes("search") && (
          <div className="searchInput">
            <input
              style={{ borderRadius: "500px", backgroundColor: "#242424" }}
              type="text"
              placeholder="Search"
              className=""
              value={searchTxt}
              onChange={handleTxtChange}
            />
          </div>
        )}

        {loggedIn ? (
          <div className="SigninUp">
            <IconButton
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="SigninUp"
              style={{
                color: hover ? "green" : "white",
                padding: "0.8rem",

                alignItems: "center",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 700,
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingTop: "8px",
                textAlign: "center",
                borderRadius: "9999px",
                backgroundColor: hover ? "Background" : "black",
                // textDecoration: hover ? "green" : "green", // 👈 the underline on hover
                borderBottom: hover
                  ? "5px solid green"
                  : "2px solid transparent", // 👈 bottom border as underline
                transition: "all 0.3s ease-in-out", // optional for smoothness
              }}
              onClick={handleLogout}
            >
              Log Out
            </IconButton>
          </div>
        ) : (
          <div className="SigninUp">
            <IconButton
              className="SigninUp"
              style={{ color: "white" }}
              onClick={handleNavigate}
            >
              Sign in
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
