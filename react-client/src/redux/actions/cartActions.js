import * as actionTypes from "../constants/cartConstants";
import axios from "axios";
//Dispatches the actions come from constants with somevalue
//This values passed to reducer
//ACTION ONLY CALLS REDUCER FUNCTION, REDUCER CHANGES VALUES
export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    //Get the product by id to store its details for later use
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    console.log("Product Data", data);
    console.log(productId);
    console.log(quantity);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      //someValue: 0,
      //Pass product data in reducer through payload
      payload: {
        productId: data._id,
        name: data.name,
        price: data.price,
        image: data.images[0] ?? null,
        count: data.count,
        quantity,
      },
    });

    console.log(
      "Current Cart Details",
      JSON.stringify(getState().cart.cartItem)
    );
    //Store Data of cart item state in localstorage key cart value acctule state
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItem));
  };

//Remove Items For Cart for users
export const removeFromCart =
  (productId, quantity, price) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      //Pass payload to reducer
      payload: { productId: productId, quantity: quantity, price: price },
    });
    //TO DO : Fix Quantity
    //console.log("Action", quantity);
    //If reducer Chnages the state
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItem));
  };
