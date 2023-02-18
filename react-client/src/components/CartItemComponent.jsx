import React from "react";
import { ListGroup, Row, Col, Image, Form, Button } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent";
const CartItemComponent = ({
  item,
  orderCreated = false,
  changeCount = false,
  removeFromCartHandler = false,
}) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            <Image
              crossOrigin="anonymous"
              src={item.image ? item.image.path ?? null : null}
              fluid
            ></Image>
          </Col>
          <Col md={2}>{item.name}</Col>
          <Col md={2}>
            <b>{item.price} $</b>
          </Col>
          <Col md={3}>
            <Form.Select
              onChange={
                changeCount
                  ? (e) => changeCount(item.productId, e.target.value)
                  : undefined
              }
              disabled={orderCreated}
              value={item.quantity}
            >
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            {/* <Button
              type="button"
              variant="secondary"
              onClick={() => window.confirm("Are You Sure?")}
            >
              <i className="bi bi-trash"></i>{" "}
           </Button>*/}
            <RemoveFromCartComponent
              orderCreated={orderCreated}
              productId={item.productId}
              quantity={item.quantity}
              price={item.price}
              removeFromCartHandler={
                removeFromCartHandler ? removeFromCartHandler : undefined
              }
            />
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent;
