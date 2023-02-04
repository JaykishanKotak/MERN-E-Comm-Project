import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useParams } from "react-router-dom";
import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const OrderDetailsPageComponent = ({ getOrder, markAsDelivered }) => {
  //Catch the dynamic id from url address from app.js with useParams
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  //disabled button if order is Delivered
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] =
    useState("Mark as delivered");
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getOrder(id)
      .then((order) => {
        setUserInfo(order.user);
        setPaymentMethod(order.paymentMethod);
        //If order is paid
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        //If order is delivered
        order.isDelivered
          ? setIsDelivered(order.deliveredAt)
          : setIsDelivered(false);
        //Cart Subtotal
        setCartSubtotal(order.orderTotal.cartSubtotal);
        //Change Message if order is delivered and disabled button
        if (order.isDelivered) {
          setOrderButtonMessage("Order is finished");
          setButtonDisabled(true);
        }
        setCartItems(order.cartItems);
      })
      .catch((er) => dispatch(logout()));
  }, [isDelivered, id]);
  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <h1>Admin Order Details</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                <h2>Shipping</h2>
                <b>Name</b>: {userInfo.firstName} {userInfo.lastName}
                <br />
                <b>Address</b> {userInfo.address} {userInfo.city},
                {userInfo.state} {userInfo.zipCode}
                <br />
                <b>Phone</b>: {userInfo.phoneNumber}
                <br />
              </Col>
              <Col md={6}>
                <h2>Payment Method</h2>
                <Form.Select value={paymentMethod} disabled={true}>
                  <option value="pp">PayPal</option>
                  <option value="cod">
                    Cash On Delivery (Delivery May be delayed)
                  </option>
                </Form.Select>
              </Col>
              <Row>
                <Col>
                  <Alert
                    className="mt-3"
                    variant={isDelivered ? "success" : "danger"}
                  >
                    {isDelivered ? (
                      <>Delivered at {isDelivered}</>
                    ) : (
                      <>Not Delivered</>
                    )}
                  </Alert>
                </Col>
                <Col>
                  <Alert
                    className="mt-3"
                    variant={isPaid ? "success" : "danger"}
                  >
                    {isPaid ? <>Paid on {isPaid}</> : <>Not paid yet</>}
                  </Alert>
                </Col>
              </Row>
            </Row>
            <br />
            <h2>Order Items</h2>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent key={idx} item={item} orderCreated={true} />
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>Order Summery</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Items Price (include tax):{" "}
                <span className="fw-bold">{cartSubtotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping: <span className="fw-bold">Included</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: <span className="fw-bold">Included</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-danger">
                Total Price: <span className="fw-bold">{cartSubtotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    size="lg"
                    variant="danger"
                    onClick={() =>
                      markAsDelivered(id).then((res) => {
                        if (res) {
                          setIsDelivered(true);
                        }
                      })
                    }
                    disabled={buttonDisabled}
                    type="button"
                  >
                    {orderButtonMessage}
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

export default OrderDetailsPageComponent;
