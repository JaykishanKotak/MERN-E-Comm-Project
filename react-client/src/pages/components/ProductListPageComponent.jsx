import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import SortOptionsComponent from "../../components/SortOptionsComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MetaComponent from "../../components/MetaComponent";
const ProductListPageComponent = ({ getProducts, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //For attrs / collect from db and show on web page
  const [attrsFilter, setAttrsFilter] = useState([]);
  //Store choosen value / user(input) filter for collecting attrs
  const [attrsFromFilter, setAttrsFromFilter] = useState([]);
  //To control filter buttons
  const [showResetFilterButton, setShowResetFilterButton] = useState(false);
  //To store filters data
  const [filters, setFilters] = useState({});
  //For price filter
  const [price, setPrice] = useState(500);
  //For Rating filter
  const [ratingsFromFilter, setRatingsFromFilter] = useState({});
  //For categories filter
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({});
  //For sorting
  const [sortOption, setSortOption] = useState("");
  //For Pagination
  const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
  const [pageNum, setPageNum] = useState(null);
  //console.log(sortOption);
  //console.log("Attrs", attrsFromFilter);
  //Get dynamic category name from url
  const { categoryName } = useParams() || "";
  //Get dynamic search from url
  const { searchQuery } = useParams() || "";
  //Get dynamic pagenum from url
  const { pageNumParam } = useParams() || 1;
  //For check path and show category table
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (categoryName) {
      //Get all data of specific category
      let categoryAllData = categories.find(
        (item) => item.name === categoryName.replaceAll(",", "/")
      );
      if (categoryAllData) {
        //Get main category name by split and get first element
        let mainCategory = categoryAllData.name.split("/")[0];
        //Get index where category name same like main category
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttrsFilter(categories[index].attrs);
      } else {
        setAttrsFilter([]);
      }
      console.log("getAllDataFromCategory", categoryAllData);
    }
  }, [categoryName, categories]);

  //For filters data
  useEffect(() => {
    getProducts(categoryName, pageNumParam, searchQuery, filters, sortOption)
      .then((products) => {
        //Store API data in local state
        setProducts(products.products);
        setPaginationLinksNumber(products.paginationLinksNumber);
        setPageNum(products.pageNum);
        //console.log(products);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
      });
    //console.log(filters);
  }, [categoryName, pageNumParam, searchQuery, filters, sortOption]);

  //For dynamic filters attrs while catagory changed
  useEffect(() => {
    //Store data in array and retrun
    //console.log(Object.entries(categoriesFromFilter));
    if (Object.entries(categoriesFromFilter).length > 0) {
      setAttrsFilter([]);
      var cat = [];
      var count;
      Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
        if (checked) {
          var name = category.split("/")[0];
          cat.push(name);
          count = cat.filter((x) => x === name).length;
          if (count === 1) {
            var index = categories.findIndex((item) => item.name === name);
            setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
          }
        }
      });
    }
  }, [categoriesFromFilter, categories]);
  //For Filter buttons
  const handleFilters = () => {
    //Clear path url with its pagination with regular expression
    navigate(location.pathname.replace(/\/[0-9]+$/, ""));
    setShowResetFilterButton(true);
    setFilters({
      price: price,
      rating: ratingsFromFilter,
      category: categoriesFromFilter,
      attrs: attrsFromFilter,
    });
  };

  const handleResetFilter = () => {
    setShowResetFilterButton(false);
    setFilters({});
    window.location.href = "/product-list";
  };
  return (
    <>
      {/*For SEO */}
      <MetaComponent title={product.name} description={product.description} />
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item className="mb-3 mt-3">
                <SortOptionsComponent setSortOption={setSortOption} />
              </ListGroup.Item>
              <ListGroup.Item>
                Filter : <br />
                <PriceFilterComponent price={price} setPrice={setPrice} />
              </ListGroup.Item>
              <ListGroup.Item>
                <RatingFilterComponent
                  setRatingsFromFilter={setRatingsFromFilter}
                />
              </ListGroup.Item>
              {/* Category filter table only visible on the main product-list page not for path which alredy have category in it's url (in other words only path with not specifc category section)*/}
              {!location.pathname.match(/\/category/) && (
                <ListGroup.Item>
                  <CategoryFilterComponent
                    setCategoriesFromFilter={setCategoriesFromFilter}
                  />
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <AttributesFilterComponent
                  attrsFilter={attrsFilter}
                  //attrsFromFilter={attrsFromFilter}
                  setAttrsFromFilter={setAttrsFromFilter}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" onClick={handleFilters}>
                  Filter
                </Button>
                {"  "}
                {showResetFilterButton && (
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={handleResetFilter}
                  >
                    Reset Filters
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            {loading ? (
              <h2>Loading Products...</h2>
            ) : error ? (
              <h1>Error while loading products. Try again later.</h1>
            ) : (
              products.map((product) => (
                <ProductForListComponent
                  key={product._id}
                  images={product.images}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  reviewsNumber={product.reviewsNumber}
                  productId={product._id}
                />
              ))
            )}
            {paginationLinksNumber > 1 ? (
              <PaginationComponent
                categoryName={categoryName}
                searchQuery={searchQuery}
                paginationLinksNumber={paginationLinksNumber}
                pageNum={pageNum}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductListPageComponent;
