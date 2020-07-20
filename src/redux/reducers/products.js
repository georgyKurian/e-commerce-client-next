import { combineReducers } from 'redux';
import { ADD_PRODUCTS } from '../actions/products';

const getId = (state = { }, action) => {
  switch (action.type) {
    case ADD_PRODUCTS: {
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
    case ADD_PRODUCTS: {
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

export default combineReducers({ getId, getAllIds });
