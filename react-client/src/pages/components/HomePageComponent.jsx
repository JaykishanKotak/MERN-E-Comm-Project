import React, { useEffect, useState } from "react";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";
const HomePageComponent = ({ categories, getBestSellers }) => {
  //   const categories = [
  //     "Tablets",
  //     "Monitors",
  //     "Games",
  //     "Printers",
  //     "Software",
  //     "Cameras",
  //     "Books",
  //     "Videos",
  //   ];

  const [mainCategories, setMainCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    //Get bestsellers api call
    getBestSellers()
      .then((data) => setBestSellers(data))
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    //Get main catagory data without sub/low level catagory data
    //Push only those which name does not include ("/") in between
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <>
      <ProductCarouselComponent bestSellers={bestSellers} />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
      {/*<CategoryCardComponent />*/}
    </>
  );
};

export default HomePageComponent;
