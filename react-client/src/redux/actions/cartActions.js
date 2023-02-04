import * as actionTypes from "../constants/cartConstants";

//Dispatches the actions come from constants with somevalue
//This values passed to reducer
//ACTION ONLY CALLS REDUCER FUNCTION, REDUCER CHANGES VALUES
export const addToCart = () => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_TO_CART,
    someValue: 0,
  });
};
