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
    //Create New Category
    case actionTypes.INSERT_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    //Delete a Category
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        //Overwtire old state with updated categories data
        categories: action.payload,
      };
    //If not matching action found
    default:
      return state;
  }
};
