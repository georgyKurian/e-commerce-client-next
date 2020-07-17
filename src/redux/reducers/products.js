import { combineReducers } from 'redux';
import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from '../actions/products';

const productState = (state = { }, action) => {
  const newState = { ...state };
  switch (action.type) {
    case REQUEST_PRODUCTS:
      newState.isFetching = true;
      return newState;
    case RECEIVE_PRODUCTS:
      newState.isFetching = false;
      newState.lastFetched = Date.now();
      return newState;
    default:
      return state;
  }
};

const getId = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS: {
      const newProductArray = { ...state };
      action.productDataList.forEach((product) => {
        newProductArray[product._id] = { ...product };
      });
      return newProductArray;
    }
    default:
      return state;
  }
};

const getAllIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS: {
      const newProductArray = [...state];
      action.productDataList.forEach((product) => {
        newProductArray.push(product._id);
      });
      return newProductArray;
    }
    default:
      return state;
  }
};

export default combineReducers({ ...productState, getId, getAllIds });
