import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

// pass fetchuser function as argument
const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  // pair of variabel name and function with init value of 0
  //const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);
  const deleteHandler = async (userId) => {
    //if (window.confirm("Are You Sure ?")) alert("Product is deleted");
    if (window.confirm("Are You Sure ?")) {
      const data = await deleteUser(userId);
      if (data === "User deleted") {
        //! means we passed opposite state
        setUserDeleted(!userDeleted);
      }
    }
  };

  //const deleteHandler = () => {
  //setCounter(counter + 1);
  //if (window.confirm("Are You Sure ?")) alert("Product is deleted");
  //};
  //useEffect(() => {
  //console.log("Use Effect Called");
  //setCounter(counter + 1);
  //called when component is unmounted
  //return () => console.log("clean up the effect");
  //}, []);
  //[] means useeffect calls only once after page is redered

  //Call fetch users function and assign its data to setUser state
  useEffect(() => {
    //Disconnet the DB when leave the page
    const abctrl = new AbortController();
    fetchUsers(abctrl)
      .then((res) => setUsers(res))
      .catch((er) =>
        //console.log(
        //er.response.data.message ? er.response.data.message : er.response.data;
        //)
        dispatch(logout())
      );
    //Abort DB conncection if its lasts too long or user leave the web page
    // used to avoid memory leackage and security problems
    return () => abctrl.abort;
  }, [userDeleted]);
  //use effect called when state deleted
  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>User List</h1>
          {/*<h1>User List {counter}</h1>*/}
          {/*console.log("HTML Rendered")*/}
          {/*{console.log(users)}*/}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Is Admin</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {/*{["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
                (item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>Mark</td>
                    <td>Twain</td>
                    <td>email@email.com</td>
                    <td>
                      <i className={item}></i>
                    </td>
                    <td>
                      <LinkContainer to="/admin/edit-user">
                        <Button className="btn-sm">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>
                      {" / "}
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={deleteHandler}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </td>
                  </tr>
                )
              )}*/}
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/edit-user/${user._id}`}>
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default UsersPageComponent;
