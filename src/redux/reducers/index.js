import { combineReducers } from 'redux';
import auth from './auth';
import productDetails from './productDetails';
import products from './products';
import reviews from './reviews';

export default combineReducers({
  auth,
  products,
  productDetails,
  reviews,
});
