import * as actionTypes from "../constants/categoryConstants";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/categories");
  //Dispatch reducert to change the state
  dispatch({
    type: actionTypes.GET_CATEGORY_REQUEST,
    //Pass api data into payload
    payload: data,
  });
};

export const saveAttrToCategoryDocument =
  (key, val, categoryChoosen) => async (dispatch, getState) => {
    const { data } = await axios.post("/api/categories/attr", {
      key,
      val,
      categoryChoosen,
    });
    if (data.categoryUpdated) {
      dispatch({
        type: actionTypes.SAVE_ATTR,
        payload: [...data.categoryUpdated],
      });
    }
  };

export const newCategory = (category) => async (dispatch, getState) => {
  //console.log(category);
  //Return all of category from redux plus new category
  const cat = getState().getCategories.categories;
  const { data } = await axios.post("/api/categories", { category });
  if (data.categoryCreated) {
    dispatch({
      type: actionTypes.INSERT_CATEGORY,
      //Retuun All of old category data + new created data
      payload: [...cat, data.categoryCreated],
    });
  }
};

export const deleteCategory = (category) => async (dispatch, getState) => {
  //Get all cats from redux and filter with category name from argument
  const cat = getState().getCategories.categories;
  const categories = cat.filter((item) => item.name !== category);
  //Delete catefory from db, we use endcode to filter out "/"
  const { data } = await axios.delete(
    "/api/categories/" + encodeURIComponent(category)
  );
  if (data.categoryDeleted) {
    dispatch({
      type: actionTypes.DELETE_CATEGORY,
      //Retrun filtered category in payload to update the state
      payload: [...categories],
    });
  }
};
