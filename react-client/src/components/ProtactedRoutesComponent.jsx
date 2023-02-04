import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserChatComponent from "./user/UserChatComponent";
//Chekc if login  or not
const ProtactedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token);
      }
      console.log("routetoken", data.data.token);
      return isAuth;
    });
  }, [isAuth]);
  if (isAuth === undefined) return <LoginPage />;

  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtactedRoutesComponent;
