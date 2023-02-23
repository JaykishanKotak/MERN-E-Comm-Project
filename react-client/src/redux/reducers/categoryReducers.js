import * as actionTypes from "../constants/categoryConstants";

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_REQUEST:
      return {
        ...state,
        categories: action.payload,
      };
    //Save Attrs data come from api and update categories data
    case actionTypes.SAVE_ATTR:
      return {
        ...state,
        categories: action.payload,
      };
    //If not matching action found
    default:
      return state;
  }
};
