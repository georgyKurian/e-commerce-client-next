import { getProducts } from "../../api/Product";

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  };
}

function receiveProducts(productDataList) {
  return {
    type: RECEIVE_PRODUCTS,
    productDataList: productDataList
  };
}

/**
 * Thunk action creator
 */
export function fetchProducts(categories) {
  return function(dispatch) {
    dispatch(requestProducts());
    return getProducts(categories).then(productDataList =>
      dispatch(receiveProducts(productDataList))
    );
  };
}
