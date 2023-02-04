import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "react-simple-star-rating";

const ProductForListComponent = ({ images, idx }) => {
  return (
    <>
      <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
        <Row>
          <Col lg={5}>
            <Card.Img
              crossOrigin="anonymous"
              variant="top"
              src={"/images/" + images[idx] + "-category.png"}
            />
          </Col>
          <Col lg={7}>
            <Card.Body>
              <Card.Title>Product Name, Lorem ipsum dolor sit amet</Card.Title>
              <Card.Text>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit
              </Card.Text>
              <Card.Text>
                <Rating readonly size={20} initialValue={5} /> (1)
              </Card.Text>
              <Card.Text className="h4">
                $123{" "}
                <LinkContainer to="/product-details">
                  <Button variant="danger">See The Product</Button>
                </LinkContainer>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductForListComponent;
