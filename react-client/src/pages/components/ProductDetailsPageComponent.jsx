import React, { useEffect, useRef, useState } from "react";
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
  getProductDetails,
  userInfo,
  writeReviewApiRequest,
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  //For Store Product data from api
  const [product, setProduct] = useState([]);
  //For showing leading message while api is calling
  const [loading, setLoading] = useState(true);
  //For errors
  const [error, setError] = useState(false);
  //For review
  const [productReviewed, setProductReviewed] = useState(false);
  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    //Show add to cart message when items are added
    setShowCartMessage(true);
  };

  //For Scroll into review message
  const messageEndRef = useRef(null);
  useEffect(() => {
    //Scroll
    if (productReviewed) {
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [productReviewed]);

  // var options = {
  //   // width: 400,
  //   // zoomWidth: 500,
  //   // fillContainer: true,
  //   // zoomPosition: "bottom",
  //   //scale: 3,
  //   scale: 2,
  //   offset: { vertical: 0, horizontal: 10 },
  // };

  //Read cart value from state to update cart values
  //const products = useSelector((state) => state.cart.value);
  //console.log(products);

  //For Reviews
  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() == true) {
      //console.log(product._id, formInputs);
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          if (data === "review created") {
            setProductReviewed("Your Review Created Succesfully!");
          }
        })
        .catch((er) => {
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          );
        });
    }
  };
  useEffect(() => {
    if (product.images) {
      var options = {
        // width: 400,
        // zoomWidth: 500,
        // fillContainer: true,
        // zoomPosition: "bottom",
        //scale: 3,
        scale: 2,
        offset: { vertical: 0, horizontal: 10 },
      };
      product.images.map(
        (image, id) =>
          new ImageZoom(document.getElementById(`imageId${id + 1}`), options)
      );
    }

    // new ImageZoom(document.getElementById("first"), options);
    // new ImageZoom(document.getElementById("second"), options);
    // new ImageZoom(document.getElementById("third"), options);
    // new ImageZoom(document.getElementById("fourth"), options);
  });

  //Get Product Data form db
  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        console.log(data);
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, productReviewed]);
  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        {/*Multiple Condition Loop {loading ? () : error ? () : () } */}
        {loading ? (
          <h2>Loading Product Details...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col style={{ zIndex: 1 }} md={4}>
              {product.images
                ? product.images.map((image, id) => (
                    <div key={id}>
                      <div key={id} id={`imageId${id + 1}`}>
                        <Image
                          fluid
                          crossOrigin="anonymous"
                          //src="/images/games-category.png"
                          src={`${image.path ?? null}`}
                        />
                      </div>
                      <br />
                    </div>
                  ))
                : null}
            </Col>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>{product.name} </h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        readonly
                        size={20}
                        initialValue={product.rating}
                      />{" "}
                      ({product.reviewsNumber})
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold"> $ {product.price} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  {" "}
                  <ListGroup>
                    <ListGroup.Item>
                      Status : {product.count > 0 ? "In Stock" : "Out Of Stock"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold"> $ {product.price} </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Quantity :
                      <Form.Select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        size="lg"
                        aria-label="Default select example"
                      >
                        {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
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
                    {product.reviews &&
                      product.reviews.map((review, idx) => (
                        <ListGroup.Item key={idx}>
                          {review.user.name}
                          <br />
                          <Rating
                            readonly
                            size={20}
                            initialValue={review.rating}
                          />
                          <br />
                          {review.createdAt.substring(0, 10)}
                          <br />
                          {review.comment}
                        </ListGroup.Item>
                      ))}
                    <div ref={messageEndRef} />
                  </ListGroup>
                </Col>
              </Row>
              <hr />
              {/*sent review form*/}
              {!userInfo.firstName && (
                <Alert variant="danger">Login first to write a review</Alert>
              )}
              <Form onSubmit={sendReviewHandler}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Write A Review</Form.Label>
                  {/*<Form.Control type="email" placeholder="name@example.com" />*/}
                  <Form.Control
                    name="comment"
                    required
                    disabled={!userInfo.firstName}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Select
                  name="rating"
                  required
                  disabled={!userInfo.firstName}
                  aria-label="Default select example"
                >
                  <option value="">Your rating</option>
                  <option value="5">5 (very good)</option>
                  <option value="4">4 (good)</option>
                  <option value="3">3 (average)</option>
                  <option value="2">2 (bad)</option>
                  <option value="1">1 (awful)</option>
                </Form.Select>
                <Button
                  disabled={!userInfo.firstName}
                  className="mb-3 mt-3"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <div className="mt-3">{productReviewed}</div>
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetailsPageComponent;
