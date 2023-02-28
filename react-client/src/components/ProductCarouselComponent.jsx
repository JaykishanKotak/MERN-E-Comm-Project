import React from "react";
import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = ({ bestSellers }) => {
  console.log(bestSellers, "BestSellers");
  const cursorPointer = {
    cursor: "pointer",
  };
  return bestSellers.length > 0 ? (
    <Carousel>
      {bestSellers.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img
            crossOrigin="anonymous"
            style={{
              height: "300px",
              objectFit: "cover",
            }}
            className="d-block w-100"
            //src="/images/carousel/carousel-1.png"
            src={item.images ? item.images[0].path : null}
            alt="First slide"
          />
          <Carousel.Caption>
            <LinkContainer
              style={cursorPointer}
              to={`/product-details/${item._id}`}
            >
              <h3>Bestseller in {item.category} Category</h3>
            </LinkContainer>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      {/*   <Carousel.Item>
          <img
            crossOrigin="anonymous"
            style={{
              height: "300px",
              objectFit: "cover",
            }}
            className="d-block w-100"
            src="/images/carousel/carousel-1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <LinkContainer style={cursorPointer} to="/product-details">
              <h3>Best Selling Laptop</h3>
            </LinkContainer>
            <p>Get List of Best selling Laptop Categerious</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{
              height: "300px",
              objectFit: "cover",
            }}
            src="/images/carousel/carousel-2.png"
            alt="Second slide"
            crossOrigin="anonymous"
          />

          <Carousel.Caption>
            <LinkContainer style={cursorPointer} to="/product-details">
              <h3>Best Selling Books</h3>
            </LinkContainer>
            <p>Get List of Best Selling Books.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{
              height: "300px",
              objectFit: "cover",
            }}
            src="/images/carousel/carousel-3.png"
            alt="Third slide"
            crossOrigin="anonymous"
          />

          <Carousel.Caption>
            <LinkContainer style={cursorPointer} to="/product-details">
              <h3>Best Selling Camaras</h3>
            </LinkContainer>
            <p>Get List of Best Selling Camaras.</p>
          </Carousel.Caption>
          </Carousel.Item>*/}
    </Carousel>
  ) : null;
};

export default ProductCarouselComponent;
