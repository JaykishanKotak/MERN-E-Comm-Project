import React from "react";
import CartPageComponent from "./components/CartPageComponent";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
const CartPage = () => {
  //const cart = useSelector((state) => state.cart);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const reduxDispatch = useDispatch();
  return (
    <CartPageComponent
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      cartItem={cartItem}
      cartSubtotal={cartSubtotal}
      reduxDispatch={reduxDispatch}
    />
  );
};

export default CartPage;
