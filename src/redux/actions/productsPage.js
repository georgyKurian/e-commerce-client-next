import { getProducts } from '../../api/Product';
import { addProducts } from './products';

export const PRODUCTS_START_FETCHING = 'PRODUCTS_START_FETCHING';
export const PRODUCTS_STOP_FETCHING = 'PRODUCTS_STOP_FETCHING';

export const PRODUCTS_ADD_PAGE = 'PRODUCTS_ADD_PAGE';

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

/**
 * Thunk action creator
 */
export function fetchProducts(categories, pageNumber) {
  return (dispatch) => {
    dispatch(startFetching());
    const lastSync = Date.now();
    return getProducts(categories, pageNumber)
      .then((productDataList) => {
        const productIdList = productDataList.map((productData) => productData._id);
        dispatch(addProducts(productDataList));
        dispatch(addPage(pageNumber, productIdList, lastSync));
      })
      .finally(() => {
        dispatch(stopFetching);
      });
  };
}

export function fetchProductsIfNeeded(categories = null, pageNumber = 0) {
  return ((dispatch, getState) => {
    const { productsPage: pages } = getState();
    if (!pages[pageNumber]) {
      return dispatch(fetchProducts(categories, pageNumber));
    }
    return null;
  });
}
