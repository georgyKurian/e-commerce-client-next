import { getProducts } from '../../api/Product';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  };
}

function receiveProducts(productDataList) {
  return {
    type: RECEIVE_PRODUCTS,
    productDataList,
  };
}

function shouldFetchProducts(state) {
  const { products } = state;
  if (!(products)) {
    return true;
  } if (!products.items && !products.isFetching) {
    return true;
  }
  return products.didInvalidate;
}

/**
 * Thunk action creator
 */
export function fetchProducts(categories) {
  return (dispatch) => {
    dispatch(requestProducts());
    return getProducts(categories).then(
      (productDataList) => dispatch(receiveProducts(productDataList)),
    );
  };
}

export function fetchProductsIfNeeded(categories) {
  return (dispatch, getState) => {
    if (shouldFetchProducts(getState())) {
      return dispatch(fetchProducts(categories));
    }
  };
}
