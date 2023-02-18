import * as actionTypes from "../constants/cartConstants";

//initial state for cart
// used only when state is empty or push item in cartItem array
const CART_INITIAL_STATE = {
  cartItem: [],
  itemCount: 0,
  cartSubtotal: 0,
};
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      //Here we will change=ing the state
      console.log("in cart reducer", action.payload);
      const productBeingAddedToCart = action.payload;

      //Check if product alredy exist in cart
      const productAlreadyExistsInState = state.cartItem.find(
        (x) => x.productId === productBeingAddedToCart.productId
      );

      const currentState = { ...state };

      //If items is alredy once in cart
      if (productAlreadyExistsInState) {
        currentState.itemCount = 0;
        currentState.cartSubtotal = 0;
        currentState.cartItem = state.cartItem.map((x) => {
          if (x.productId === productAlreadyExistsInState.productId) {
            //Overwrite items count with alrady added quantity
            currentState.itemCount += Number(productBeingAddedToCart.quantity);
            //Count total price
            const sum =
              Number(productBeingAddedToCart.quantity) *
              Number(productBeingAddedToCart.price);

            //Increase current page subtotal
            currentState.cartSubtotal += sum;
          } else {
            currentState.itemCount += Number(x.quantity);
            const sum = Number(x.quantity) * Number(x.price);
            currentState.cartSubtotal += sum;
          }
          return x.productId === productAlreadyExistsInState.productId
            ? productBeingAddedToCart
            : x;
        });
      } else {
        //currentState.itemCount = "x";
        //currentState.cartSubtotal = "x";
        currentState.itemCount += Number(productBeingAddedToCart.quantity);
        const sum =
          Number(productBeingAddedToCart.quantity) *
          Number(productBeingAddedToCart.price);

        currentState.cartSubtotal += sum;
        currentState.cartItem = [...state.cartItem, productBeingAddedToCart];
      }
      return currentState;
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (x) => x.productId !== action.payload.productId
        ),
        //Update the total item count
        itemCount: state.itemCount - action.payload.quantity,
        //Update subtotal
        cartSubtotal:
          state.cartSubtotal - action.payload.price * action.payload.quantity,
      };
    default:
      return state;
  }
};
