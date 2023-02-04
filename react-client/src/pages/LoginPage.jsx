import React from "react";
import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  //Save Data in local/session storage if user opt for doNotLogout
  if (data.userLoggedIn.doNotLogout) {
    //data saved in key(userInfo)
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    //localStorage saves data even if close browser
  } else {
    //sessionStorage  removes data if browser is close
    sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  }
  return data;
};
const LoginPage = () => {
  //Sent js object with request to send data
  const reduxDispatch = useDispatch();
  return (
    <>
      <LoginPageComponent
        loginUserApiRequest={loginUserApiRequest}
        reduxDispatch={reduxDispatch}
        setReduxUserState={setReduxUserState}
      />
    </>
  );
};

export default LoginPage;
