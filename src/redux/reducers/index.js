import { combineReducers } from 'redux';
import auth from './auth';
import productDetails from './productDetails';
import products from './products';
import reviews from './reviews';
import cart from './cart';

export default combineReducers({
  auth,
  cart,
  products,
  productDetails,
  reviews,
});
