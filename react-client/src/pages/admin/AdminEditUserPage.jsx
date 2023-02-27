import React, { useState } from "react";
import EditUserPageComponent from "./components/EditUserPageComponent";
import axios from "axios";

const fetchUser = async (userId) => {
  const { data } = await axios.get(`/api/users/${userId}`);
  return data;
};
const updateUserApiRequest = async (
  userId,
  firstName,
  lastName,
  email,
  isAdmin
) => {
  //console.log(firstName, lastName, email, isAdmin);
  const { data } = await axios.put(`/api/users/${userId}`, {
    firstName,
    lastName,
    email,
    isAdmin,
  });
  return data;
};
const AdminEditUserPage = () => {
  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
    />
  );
};

export default AdminEditUserPage;
