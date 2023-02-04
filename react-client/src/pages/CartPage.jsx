import React from "react";
import { Row, Col, Container, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../components/CartItemComponent";
export const CartPage = () => {
  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <Col md={8}>
            <h1> Shopping Cart</h1>
            <ListGroup variant="flush">
              {Array.from({ length: 3 }).map((item, idx) => (
                <>
                  <CartItemComponent
                    item={{
                      image: { path: "/images/tablets-category.png" },
                      name: "Product name",
                      price: 10,
                      count: 10,
                      quantity: 10,
                    }}
                    key={idx}
                  />
                  <br />
                </>
              ))}
            </ListGroup>
            <Alert variant="info"> Your Cart Is Empty</Alert>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3> Subt-total (2 items)</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: <span className="fw-bold"> $ 123</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <LinkContainer to="/user/cart-details">
                  <Button type="button">Procced To Checkout</Button>
                </LinkContainer>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
