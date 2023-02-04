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
const RegisterPageComponent = ({
  registerUserApiRequest,
  setReduxUserState,
  reduxDispatch,
}) => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  //For passwords match in realtime
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const checkPassword = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    //console.log("password", Password.value);
    //console.log("check password", ConfirmPassword.value);

    if (confirmPassword.value === password.value) {
      //confirm.setCustomValidity("");
      setPasswordsMatchState(true);
    } else {
      //confirm.setCustomValidity("Passwords do not match");
      setPasswordsMatchState(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    //const form = event.currentTarget;
    //elemnet used to read all of form fileds
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      password &&
      firstName &&
      lastName &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(firstName, lastName, email, password)
        .then((data) => {
          console.log("data", data);
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          //dispatch action to store user data
          reduxDispatch(setReduxUserState(data.userCreated));
          //store data in sessionStotege => code moved to the main register page component to reduce dependancy
          //   sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
          //   if (data.success === "User created") {
          //     window.location.href = "/user";
          //   }
        })
        .catch((er) => {
          console.log("Errorhere", er);
          setRegisterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <h1>Register</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Your first name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  minLength={2}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid first name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Your last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  minLength={2}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Last Name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                  minLength={6}
                  onChange={checkPassword}
                  isInvalid={!passwordsMatchState}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  required
                  type="password"
                  placeholder="Repeat Password"
                  minLength={6}
                  onChange={checkPassword}
                  isInvalid={!passwordsMatchState}
                />
                <Form.Control.Feedback type="invalid">
                  Both passwords should match
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="pb-2">
                <Col>
                  Already A Registerd User ? {"  "}
                  <Link to="/login">Login</Link>
                </Col>
              </Row>
              <Button type="submit">
                {" "}
                {registerUserResponseState &&
                registerUserResponseState.loading === true ? (
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
                Submit
              </Button>
              <Alert
                className="mt-3"
                show={
                  registerUserResponseState &&
                  registerUserResponseState.error === "user exists"
                }
                variant="danger"
              >
                User is Already Register !
              </Alert>
              <Alert
                className="mt-3"
                show={
                  registerUserResponseState &&
                  registerUserResponseState.success === "User created"
                }
                variant="info"
              >
                User Registerd, Succesfully
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPageComponent;
