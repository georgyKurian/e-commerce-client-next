import {
  PRODUCTS_START_FETCHING,
  PRODUCTS_STOP_FETCHING,
  PRODUCTS_ADD_PAGE,
  PRODUCTS_UPDATE_FILTER,
  PRODUCTS_UPDATE_SORT_BY,
} from '../actions/productsPage';

const productsPage = (state = {
  isFetching: false,
  isInvalid: false,
  pages: {},
  filters: {},
  sortBy: null,
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
      newState.pages = { ...state.pages };
      newState.pages[action.pageNumber] = {
        products: action.productIdList,
        lastFetched: action.fetchTime,
      };
      return newState;
    case PRODUCTS_UPDATE_FILTER:
      newState.pages = {};
      newState.filters = { ...newState.filters };
      newState.filters[action.filterCode] = action.filterValues;
      return newState;
    case PRODUCTS_UPDATE_SORT_BY:
      newState.pages = {};
      newState.sortBy = action.sortByCode;
      return newState;
    default:
      return state;
  }
};

export default productsPage;
