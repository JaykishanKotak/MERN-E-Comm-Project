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
import CartItemComponent from "../../../components/CartItemComponent";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
const UserCartDetailsPageComponent = ({
  cartItem,
  itemCount,
  cartSubtotal,
  getUser,
  userInfo,
  reduxDispatch,
  addToCart,
  removeFromCart,
  createOrder,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState({});
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pp");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getUser()
      .then((data) => {
        //console.log("users", data);
        if (
          !data.address ||
          !data.city ||
          !data.country ||
          !data.zipCode ||
          !data.state ||
          !data.phoneNumber
        ) {
          setButtonDisabled(true);
          setMissingAddress(
            " In order to make order, fill out your profile with correct address, city etc."
          );
        } else {
          setUserAddress({
            address: data.address,
            city: data.city,
            country: data.country,
            state: data.state,
            zipCode: data.zipCode,
            phoneNumber: data.phoneNumber,
          });
          setMissingAddress(false);
        }
      })
      .catch(
        //(er) => (er) => dispatch(logout())
        (er) =>
          console.log(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
      );
  }, [userInfo._id]);

  //Handle Order Details
  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItem.map((item) => {
        return {
          productId: item.productId,
          name: item.name,
          //prettier-ignore
          image: { path: item.image ? (item.image.path ?? null) : null},
          price: item.price,
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    //console.log("orderData", orderData);
    //Call create order api here
    createOrder(orderData)
      .then((data) => {
        if (data) {
          navigate("/user/order-details/" + data._id);
        }
      })
      .catch((err) => console.log(err));
  };

  //For Set Payment method
  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  //For Change the quantity of products in cart
  const changeCount = (productId, count) => {
    reduxDispatch(addToCart(productId, count));
  };

  //For Remove Item Form Cart
  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are You Sure?")) {
      reduxDispatch(removeFromCart(productId, quantity, price));
      window.location.reload();
    }
  };
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Cart Details</h1>
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
              <Form.Select onChange={choosePayment}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (Delivery May be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Not delivered. {missingAddress}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="success">
                  Not Paid Yet
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order Items</h2>
          <ListGroup variant="flush">
            {cartItem.map((item, idx) => (
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
                removeFromCartHandler={removeFromCartHandler}
                changeCount={changeCount}
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
                  Place Order
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPageComponent;
