import { combineReducers } from 'redux';
import checkout from './checkout';
import auth from './auth';
import productDetails from './productDetails';
import products from './products';
import reviews from './reviews';
import cart from './cart';
import productsPage from './productsPage';

export default combineReducers({
  auth,
  cart,
  checkout,
  products,
  productDetails,
  reviews,
  productsPage,
});
