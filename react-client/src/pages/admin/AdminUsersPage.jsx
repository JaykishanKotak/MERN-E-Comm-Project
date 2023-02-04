import React from "react";
import UsersPageComponent from "./components/UsersPageComponent";
import axios from "axios";

//This is called Dependancy Injection -> inject some service
// it helps to test component
const fetchUsers = async (abctrl) => {
  //const users = await axios.get("/api/users");
  //fetch only data
  const { data } = await axios.get("/api/users", {
    signal: abctrl.signal,
  });
  //console.log("Data", users.data.users);
  //return data
  return data.users;
};
//fetchUsers();

const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/users/${userId}`);
  return data;
};
const AdminUsersPage = () => {
  return (
    <>
      {/*Pass the property to component*/}
      <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />
    </>
  );
};

export default AdminUsersPage;
