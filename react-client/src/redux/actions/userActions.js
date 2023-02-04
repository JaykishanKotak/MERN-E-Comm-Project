import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";
import axios from "axios";
//Stors user data in redux once loggedin
//Call the action in login page
export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};
export const logout = (dispatch) => {
  //Redirect to login page
  document.location.href = "/login";
  axios.get("/api/logout");
  //Remove user data from localstorage and session storage
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  //Remove Cart
  localStorage.removeItem("cart");
  //Dispatch action to clear redux
  dispatch({ type: LOGOUT_USER });
};
