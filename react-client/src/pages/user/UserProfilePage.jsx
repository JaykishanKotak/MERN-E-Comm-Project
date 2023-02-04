import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const UserProfilePage = () => {
  const [validated, setValidated] = useState(false);
  const checkPassword = () => {
    const Password = document.querySelector("input[name=Password]");
    const ConfirmPassword = document.querySelector(
      "input[name=ConfirmPassword]"
    );
    //console.log("password", Password.value);
    //console.log("check password", ConfirmPassword.value);

    if (ConfirmPassword.value === Password.value) {
      ConfirmPassword.setCustomValidity("");
    } else {
      ConfirmPassword.setCustomValidity("Password Does'nt match");
    }
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <h1>My Profile</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Your first name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue="John"
                  name="First Name"
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
                  defaultValue="Doe"
                  name="lastname"
                  minLength={2}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Last Name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  disabled
                  value="john@doe.com   if you want to change email, remove account and create new one with new email address"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Phone Number"
                  defaultValue=" "
                  maxLength={10}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Full Address"
                  defaultValue=" "
                  //maxLength={100}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Country"
                  defaultValue=" "
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Zip Code"
                  defaultValue=" "
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your City"
                  defaultValue=" "
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your State"
                  defaultValue=" "
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="Password"
                  minLength={6}
                  onChange={checkPassword}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  name="ConfirmPassword"
                  minLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  Both passwords should match
                </Form.Control.Feedback>
              </Form.Group>

              <Button varient="primary" type="submit">
                Update
              </Button>
              <Alert className="mt-3" show={true} variant="danger">
                User is Already Register !
              </Alert>
              <Alert className="mt-3" show={true} variant="info">
                User Registerd, Succesfully
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfilePage;
