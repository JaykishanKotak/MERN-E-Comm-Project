import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
const LoginPageComponent = ({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  //For spinner and alert box
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  //To redirect after login
  //const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    //Read value of each elements
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;
    //if (form.checkValidity() === false) {
    //}
    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          //console.log(res)
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });
          //To store data in redux
          // If user is logged in then call the actions to store data
          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
          }
          if (res.success === "User logged in" && !res.userLoggedIn.isAdmin) {
            window.location.href = "/user";
          } else {
            window.location.href = "/admin/orders";
          }
          //if (res.Success === "User logged in" && !res.userLoggedIn.isAdmin) {
          //Navigate After Login
          //For Regular Users
          //navigate("/user", { replace: true });
          //} else {
          //For Admin Only
          //{ replace: true } means react delete history of perivous pages
          //so user can't go back to the login page
          // navigate("/admin/orders/", { replace: true });
          //}
        })
        .catch((er) =>
          setLoginUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }
    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                /*label="Remember Me"*/
                label="Do not logout"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Don't you have an account? Create Here
                <Link to={"/register"}> Register </Link>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              {" "}
              {loginUserResponseState &&
              loginUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  //animation="grow"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}{" "}
              Login
            </Button>
            <Alert
              className="mt-3"
              show={
                loginUserResponseState &&
                loginUserResponseState.error === "Wrong Credentials"
              }
              variant="danger"
            >
              Wrong Credential
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
