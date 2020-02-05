import { combineReducers } from "redux";
import token from "./token";
import user from "./user";
import products from "./products";
import productDetails from "./productDetails";

export default combineReducers({
  token,
  user,
  products,
  productDetails
});
