import React, { Fragment } from "react";
import { Row, Col, Container, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";
export const CartPageComponent = ({
  addToCart,
  removeFromCart,
  cartItem,
  cartSubtotal,
  reduxDispatch,
}) => {
  console.log(cartItem);
  console.log(cartSubtotal);
  //For Change the quantity of products in cart
  const changeCount = (productId, count) => {
    reduxDispatch(addToCart(productId, count));
  };
  //For Remove Item Form Cart
  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are You Sure?")) {
      // console.log(productId);
      // console.log(quantity);
      // console.log(price);
      //Fire Remove from cart action
      reduxDispatch(removeFromCart(productId, quantity, price));
      window.location.reload();
    }
  };
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1> Shopping Cart</h1>
          {cartItem.length === 0 ? (
            <Alert className="mt-4 text-center" variant="info">
              {" "}
              Your Cart Is Empty !
            </Alert>
          ) : (
            <ListGroup variant="flush" className="mt-4">
              {cartItem.map((item, idx) => (
                <Fragment key={idx}>
                  <CartItemComponent
                    // item={{
                    //   image: { path: "/images/tablets-category.png" },
                    //   name: "Product name",
                    //   price: 10,
                    //   count: 10,
                    //   quantity: 10,
                    // }}
                    item={item}
                    key={idx}
                    changeCount={changeCount}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                  <br />
                </Fragment>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                {" "}
                Subt-total ({cartItem.length}{" "}
                {cartItem.length === 1 ? "Product" : "Products"} )
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold"> $ {cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button disabled={cartSubtotal === 0} type="button">
                  Procced To Checkout
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPageComponent;
