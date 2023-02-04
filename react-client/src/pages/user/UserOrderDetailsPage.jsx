import React from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const UserOrderDetailsPage = () => {
  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <h1>Order Details</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                <h2>Shipping</h2>
                <b>Name</b>: John Doe
                <br />
                <b>Address</b> 1000 S Westgate Ave Los Angeles, California(CA),
                90049
                <br />
                <b>Phone</b>: (310) 207-1320
                <br />
              </Col>
              <Col md={6}>
                <h2>Payment Method</h2>
                <Form.Select disabled={false}>
                  <option value="pp">PayPal</option>
                  <option value="cod">
                    Cash On Delivery (Delivery May be delayed)
                  </option>
                </Form.Select>
              </Col>
              <Row>
                <Col>
                  <Alert className="mt-3" variant="danger">
                    Not Delivered
                  </Alert>
                </Col>
                <Col>
                  <Alert className="mt-3" variant="success">
                    Paid on 2023-01-01
                  </Alert>
                </Col>
              </Row>
            </Row>
            <br />
            <h2>Order Items</h2>
            <ListGroup variant="flush">
              {Array.from({ length: 3 }).map((item, idx) => (
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
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>Order Summery</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Items Price (include tax): <span className="fw-bold">$123</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping: <span className="fw-bold">Included</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: <span className="fw-bold">Included</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-danger">
                Total Price: <span className="fw-bold">$123</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button size="lg" variant="danger" type="button">
                    Pay for the order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserOrderDetailsPage;
