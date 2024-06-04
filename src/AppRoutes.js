import { Route, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import ROUTES from "./ROUTES";
import LoginRegisterPage from "./pages/LoginRegisterPage";

import PlaylistPage from "./pages/PlaylistPage";
import Upload from "./components/Upload";
import Home from "./components/Home";
import LikedSongsPage from "./pages/LikedSongsPage";
import GetAllSongsPage from "./pages/GetAllSongsPage";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ErrorPage404 from "./components/ErrorPage404";
import GetAllUsers from "./AdminPanel/GetAllusers";

const AuthenticatedRoute = ({ children }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      alert("Not authorized");
    }
  }, [loggedIn]);
  if (!loggedIn) {
    return (
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "larger",
        }}
      >
        You are not allowed to view this page
      </div>
    );
  }

  return <>{children}</>;
};
const AppRoutes = () => {
  return (
    <Routes>
      //Guards loginregister upload//
      <Route path={ROUTES.LOGIN} element={<LoginRegisterPage />} />
      <Route path={ROUTES.CATEGORIES} element={<Categories />} />
      <Route
        path={ROUTES.UPLOAD}
        element={
          <AuthenticatedRoute>
            <Upload />
          </AuthenticatedRoute>
        }
      />
      <Route path={ROUTES.HOME} element={<Categories />} />
      <Route path={`${ROUTES.PLAYLIST}/:id`} element={<PlaylistPage />} />
      <Route path={`${ROUTES.EDITPROFILE}/:id`} element={<EditProfile />} />
      <Route
        path={ROUTES.SEARCH}
        element={
          <div>
            <GetAllSongsPage />
          </div>
        }
      />
      <Route
        path={ROUTES.LIBRARY}
        element={
          <div>
            <LikedSongsPage />
          </div>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthenticatedRoute>
            <Profile />
          </AuthenticatedRoute>
        }
      />
      <Route path={ROUTES.ALLUSERS} element={<GetAllUsers />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
};
export default AppRoutes;
