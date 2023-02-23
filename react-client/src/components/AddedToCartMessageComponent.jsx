import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AddedToCartMessageComponent = ({
  setShowCartMessage,
  showCartMessage,
}) => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const goBack = () => {
    //-1 means last page visited on browser before this component
    navigate(-1);
  };
  return (
    <Alert
      //show={show}
      show={showCartMessage}
      variant="success"
      //onClose={() => setShow(false)}
      onClose={() => setShowCartMessage(false)}
      dismissible
      className="mt-5"
    >
      <Alert.Heading>The product was added to your cart !</Alert.Heading>
      <p>
        <Link to="/cart-page">
          <Button variant="success">Go To Cart</Button>
        </Link>
        {"  "}
        <Button variant="danger" onClick={goBack}>
          {" "}
          Go Back
        </Button>
      </p>
    </Alert>
  );
};

export default AddedToCartMessageComponent;
