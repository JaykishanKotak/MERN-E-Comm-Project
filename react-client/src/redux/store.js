import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { counterReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";
import { userRegisterLoginReducer } from "./reducers/userReducers";
//Create a reducer which is used to changeing the state
//Default state => { value: 0 }
//const countReducer = (state = { value: 0 }) => {
// const countReducer = (state = { value: 0 }, action) => {
//   switch (action.type) {
//     case "ADD":
//       return { value: state.value + 1 + action.someValue };
//     default:
//       return state;
//   }
// };
//Create a redux store and pass reducer as argument
//we can also define default state here
//composeWithDevTools for dev tools extenstion
//const store = createStore(countReducer, { value: 0 }, composeWithDevTools());
const reducer = combineReducers({
  cart: counterReducer,
  userRegisterLogin: userRegisterLoginReducer,
});

//To Store the data of local/session storage in redux
//Get user data from local storage
const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};
//pass value in inital state
//Creating initial state to store data in Localstorage
const INITIAL_STATE = {
  cart: {
    value: 0,
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

//Apply thunk middleware
const middleware = [thunk];

const store = createStore(
  reducer,
  //{ cart: { value: 0 } },
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);
//with dispatch we can call the action to chnage state
//Args : Object and property type
// store.dispatch({
//   type: "ADD",
//   someValue: 10,
// });
//getState returns entire state of store
//console.log(store.getState());

export default store;
