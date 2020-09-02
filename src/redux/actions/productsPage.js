import { getProducts } from '../../api/Product';
import { addProducts } from './products';

export const PRODUCTS_START_FETCHING = 'PRODUCTS_START_FETCHING';
export const PRODUCTS_STOP_FETCHING = 'PRODUCTS_STOP_FETCHING';

export const PRODUCTS_ADD_PAGE = 'PRODUCTS_ADD_PAGE';

export const PRODUCTS_ADD_FILTER = 'PRODUCTS_ADD_FILTER';
export const PRODUCTS_REMOVE_FILTER = 'PRODUCTS_REMOVE_FILTER';
export const PRODUCTS_RESET_FILTER = 'PRODUCTS_RESET_FILTER';

export const PRODUCTS_UPDATE_SORT_BY = 'PRODUCTS_UPDATE_SORYBY';

/**
 * STATE SHAPE
 * {
 *  isFetching: bool
 *  isInvalid:false
 *  sortBy: null
 *  isAsc: true
 *  filter:{
 *    gender: M,
 *    sport: soccer,
 *  }
 *  pages:[
 *    1 => {
 *      products:[32,33,44,55],
 *      lastFetch:154565989,
 *    },
 *    4 => {
 *      products:[42,23,14,64],
 *      lastFetch:154565989,
 *    },
 *  ]
 *  filters:[
 *    'size' => [8,9],
 *    'gender' => [M],
 *  ],
 *  sortBy: 'price-low-to-high'
 */

function startFetching() {
  return {
    type: PRODUCTS_START_FETCHING,
  };
}

function stopFetching() {
  return {
    type: PRODUCTS_STOP_FETCHING,
  };
}

function addPage(pageNumber, productIdList, fetchTime) {
  return {
    type: PRODUCTS_ADD_PAGE,
    pageNumber,
    productIdList,
    fetchTime,
  };
}

function updateSortBy(sortByCode) {
  return {
    type: PRODUCTS_UPDATE_SORT_BY,
    sortByCode,
  };
}

/**
 * Thunk action creator
 */
function fetchPage(pageNumber, filters, sortBy) {
  return (dispatch) => {
    dispatch(startFetching());
    const lastSync = Date.now();
    return getProducts(pageNumber, filters, sortBy)
      .then((productDataList) => {
        const productIdList = productDataList.map((productData) => productData._id);
        dispatch(addProducts(productDataList));
        dispatch(addPage(pageNumber, productIdList, lastSync));
      })
      .finally(() => {
        dispatch(stopFetching());
      });
  };
}

export function fetchProductsPage(pageNumber = 0) {
  return ((dispatch, getState) => {
    const {
      productsPage: {
        pages, filters, sortBy,
      },
    } = getState();
    if (!pages[pageNumber]) {
      return dispatch(fetchPage(pageNumber, filters, sortBy));
    }
    return null;
  });
}

export function addFilter(filterCode, filterValue, multiSelect) {
  return ((dispatch) => {
    dispatch({
      type: PRODUCTS_ADD_FILTER,
      filterCode,
      filterValue,
      multiSelect,
    });
  });
}

export function removeFilter(filterCode, filterValue) {
  return ((dispatch) => {
    dispatch({
      type: PRODUCTS_REMOVE_FILTER,
      filterCode,
      filterValue,
    });
  });
}

export function updateSorting(sortByCode) {
  return ((dispatch) => {
    dispatch(updateSortBy(sortByCode));
  });
}
