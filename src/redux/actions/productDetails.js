import { getProductDetails } from "../../api/Product";

export const REQUEST_PRODUCT_DETAILS = "REQUEST_PRODUCT_DETAILS";
export const RECEIVE_PRODUCT_DETAILS = "RECEIVE_PRODUCT_DETAILS";

function requestProductDetails() {
  return {
    type: REQUEST_PRODUCT_DETAILS
  };
}

function receiveProductDetails(productData) {
  return {
    type: RECEIVE_PRODUCT_DETAILS,
    productData: productData
  };
}

/**
 * Thunk action creator
 */
export function fetchProductDetails(productId) {
  return function(dispatch) {
    dispatch(requestProductDetails());
    return getProductDetails(productId).then(productData =>
      dispatch(receiveProductDetails(productData))
    );
  };
}
