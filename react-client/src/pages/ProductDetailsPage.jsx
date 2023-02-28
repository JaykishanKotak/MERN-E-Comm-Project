import React, { useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
//Redux Imports
//useSelector used to read data form redux state
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { addToCart } from "../redux/actions/cartActions";
import axios from "axios";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};
const ProductDetailsPage = () => {
  //{
  // const {id} = useParams();
  // console.log("Dynamic Product ID", id);
  //}
  //Fetch cart value from state
  //Only for learning purpose
  //const products = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  //Get data of loggedin user form redix
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  // const addToCartHandler = () => {
  //   dispatch(addToCart());
  // };

  //For store reviews data in db
  const writeReviewApiRequest = async (productId, formInputs) => {
    const { data } = await axios.post(`/api/users/review/${productId}`, {
      ...formInputs,
    });
    return data;
  };
  return (
    <ProductDetailsPageComponent
      //addToCartHandler={addToCartHandler}
      addToCartReduxAction={addToCart}
      //products={products}
      reduxDispatch={dispatch}
      getProductDetails={getProductDetails}
      userInfo={userInfo}
      writeReviewApiRequest={writeReviewApiRequest}
    />
  );
};

export default ProductDetailsPage;
