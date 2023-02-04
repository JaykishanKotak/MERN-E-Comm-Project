import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import RegisterPageComponent from "./components/RegisterPageComponent";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const registerUserApiRequest = async (firstName, lastName, email, password) => {
  //we send data in arguments like req body type format that send to api
  const { data } = await axios.post("/api/users/register", {
    firstName,
    lastName,
    email,
    password,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if (data.success === "User created") {
    window.location.href = "/user";
  }
  console.log(data);
  return data;
};

const RegisterPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <>
      <RegisterPageComponent
        registerUserApiRequest={registerUserApiRequest}
        reduxDispatch={reduxDispatch}
        setReduxUserState={setReduxUserState}
      />
    </>
  );
};

export default RegisterPage;
