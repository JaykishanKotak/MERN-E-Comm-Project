import React, { useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
//Redux Imports
//useSelector used to read data form redux state
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent";
import { addToCart } from "../redux/actions/cartActions";
const ProductDetailsPage = () => {
  //{
  // const {id} = useParams();
  // console.log("Dynamic Product ID", id);
  //}
  //Fetch cart value from state
  //Only for learning purpose
  //const products = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  // const addToCartHandler = () => {
  //   dispatch(addToCart());
  // };
  return (
    <ProductDetailsPageComponent
      //addToCartHandler={addToCartHandler}
      addToCartReduxAction={addToCart}
      //products={products}
      reduxDispatch={dispatch}
    />
  );
};

export default ProductDetailsPage;
