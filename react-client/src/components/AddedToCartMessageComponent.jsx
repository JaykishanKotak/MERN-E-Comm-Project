import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const AddedToCartMessageComponent = () => {
  const [show, setShow] = useState(true);
  return (
    <Alert
      show={show}
      variant="success"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>The product was added to your cart !</Alert.Heading>
      <p>
        <Link to="/cart-page">
          <Button variant="success">Go To Cart</Button>
        </Link>
        {"  "}
        <Button variant="danger"> Go Back</Button>
      </p>
    </Alert>
  );
};

export default AddedToCartMessageComponent;
