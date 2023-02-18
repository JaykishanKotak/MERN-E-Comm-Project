import React, { useEffect, useRef, useState } from "react";
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
// TO read order id from dynamic url params / address
import { useParams } from "react-router-dom";

const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  //loadScript,
  loadPaypalScripts,
}) => {
  const { id } = useParams();

  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // refrance a element without using id
  const paypalContainer = useRef();
  console.log(paypalContainer);
  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address,
          city: data.city,
          country: data.country,
          state: data.state,
          zipCode: data.zipCode,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, []);

  //To get order details
  useEffect(() => {
    getOrder(id)
      .then((data) => {
        //Set data from api
        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Your Order is Finished");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "pp") {
            setOrderButtonMessage("Pay for your order");
          } else if (data.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMessage("Wait for your order. You pay on delivery.");
          }
        }
        console.log("here", data);
      })
      .catch((err) => console.log(err));
  }, []);

  const orderHandler = () => {
    //Deavtivate payment button
    setButtonDisabled(true);
    if (paymentMethod === "pp") {
      setOrderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!isPaid) {
        //Pass the order details in paypal scripts
        loadPaypalScripts(cartSubtotal, cartItems, id, updateStateAfterOrder);
      }
    } else {
      setOrderButtonMessage("Your order was placed, Thank you !");
    }
  };

  //After order is finished
  const updateStateAfterOrder = (paidAt) => {
    setOrderButtonMessage("Thank you for your payment!");
    setIsPaid(paidAt);
    setButtonDisabled(true);
    paypalContainer.current.style = "display: none";
  };
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.firstName} {userInfo.lastName}
              <br />
              <b>Address</b> {userAddress.address}, {userAddress.city}{" "}
              {userAddress.state}, {userAddress.zipCode}.
              <br />
              <b>Phone</b>: {userAddress.phoneNumber}
              <br />
            </Col>
            <Col md={6}>
              <h2>Payment Method</h2>
              <Form.Select disabled={true} value={paymentMethod}>
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
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Paid on {isPaid}</> : <>Not Paid Yet</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order Items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
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
                orderCreated={true}
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
              Items Price (include tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">Included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total Price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                  onClick={orderHandler}
                >
                  {orderButtonMessage}
                </Button>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPageComponent;
