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
