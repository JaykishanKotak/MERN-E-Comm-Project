import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import { useParams } from "react-router-dom";
const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    //Show add to cart message when items are added
    setShowCartMessage(true);
  };
  var options = {
    // width: 400,
    // zoomWidth: 500,
    // fillContainer: true,
    // zoomPosition: "bottom",
    //scale: 3,
    scale: 2,
    offset: { vertical: 0, horizontal: 10 },
  };

  //Read cart value from state to update cart values
  //const products = useSelector((state) => state.cart.value);
  //console.log(products);
  useEffect(() => {
    new ImageZoom(document.getElementById("first"), options);
    new ImageZoom(document.getElementById("second"), options);
    new ImageZoom(document.getElementById("third"), options);
    new ImageZoom(document.getElementById("fourth"), options);
  });
  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        <Col style={{ zIndex: 1 }} md={4}>
          <div id="first">
            <Image
              fluid
              crossOrigin="anonymous"
              src="/images/games-category.png"
            />
          </div>
          <br />
          <div id="second">
            <Image
              fluid
              crossOrigin="anonymous"
              src="/images/monitors-category.png"
            />
          </div>
          <br />

          <div id="third">
            <Image
              fluid
              crossOrigin="anonymous"
              src="/images/tablets-category.png"
            />
          </div>
          <br />

          <div id="fourth">
            <Image
              fluid
              crossOrigin="anonymous"
              src="/images/games-category.png"
            />
          </div>
          <br />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1> Product Name </h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating readonly size={20} initialValue={5} /> (1)
                </ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold"> $123 </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              {" "}
              <ListGroup>
                <ListGroup.Item>Status : In Stock</ListGroup.Item>
                <ListGroup.Item>
                  Price <span className="fw-bold"> $123 </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Quantity :
                  <Form.Select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    size="lg"
                    aria-label="Default select example"
                  >
                    <option>Choose</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} variant="danger">
                    Add to cart
                  </Button>
                </ListGroup.Item>
                {/*<ListGroup.Item>Vestibulum at eros</ListGroup.Item>*/}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>Reviews</h5>
              <ListGroup variant="flush">
                {Array.from({ length: 10 }).map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    John Doe
                    <br />
                    <Rating readonly size={20} initialValue={4} />
                    <br />
                    20-20-2020
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          sent review form
          <Alert variant="danger">Login first to write a review</Alert>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write A Review</Form.Label>
              {/*<Form.Control type="email" placeholder="name@example.com" />*/}
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Your rating</option>
              <option value="5">5 (very good)</option>
              <option value="4">4 (good)</option>
              <option value="3">3 (average)</option>
              <option value="2">2 (bad)</option>
              <option value="1">1 (awful)</option>
            </Form.Select>
            <Button className="mb-3 mt-3" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPageComponent;
