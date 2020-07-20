import { combineReducers } from 'redux';
import {
  PRODUCTS_START_FETCHING,
  PRODUCTS_STOP_FETCHING,
  PRODUCTS_ADD_PAGE,
} from '../actions/productsPage';

const productsPage = (state = {
  isFetching: false,
  isInvalid: false,
  sortBy: null,
  isSortOrderAsc: true,
  pages: {},
}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case PRODUCTS_START_FETCHING:
      newState.isFetching = true;
      return newState;
    case PRODUCTS_STOP_FETCHING:
      newState.isFetching = false;
      return newState;
    case PRODUCTS_ADD_PAGE:
      newState.pages[action.pageNumber] = {
        products: action.productIdList,
        lastFetched: action.lastSync,
      };
      return newState;
    default:
      return state;
  }
};

const filter = (state = {}, action) => {
  switch (action) {
    default:
      return state;
  }
};

export default productsPage;
