import { combineReducers } from "redux";
import token from "./token";
import user from "./user";
import products from "./products";
import productDetails from "./productDetails";
import reviews from "./reviews";

export default combineReducers({
  token,
  user,
  products,
  productDetails,
  reviews
});
