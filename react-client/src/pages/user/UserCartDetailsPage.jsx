import React from "react";
import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import axios from "axios";

const UserCartDetailsPage = () => {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const itemCount = useSelector((state) => state.cart.itemCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const reduxDispatch = useDispatch();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  //Save Order Details into DB
  const createOrder = async (orderData) => {
    const { data } = await axios.post("/api/orders", { ...orderData });
    return data;
  };
  return (
    <UserCartDetailsPageComponent
      cartItem={cartItem}
      itemCount={itemCount}
      cartSubtotal={cartSubtotal}
      getUser={getUser}
      userInfo={userInfo}
      reduxDispatch={reduxDispatch}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      createOrder={createOrder}
    />
  );
};

export default UserCartDetailsPage;
