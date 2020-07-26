import { getProductDetails } from '../../api/Product';
import { getProductReviewSummary } from '../../api/Review';

export const REQUEST_PRODUCT_DETAILS = 'REQUEST_PRODUCT_DETAILS';
export const RECEIVE_PRODUCT_DETAILS = 'RECEIVE_PRODUCT_DETAILS';

function requestProductDetails() {
  return {
    type: REQUEST_PRODUCT_DETAILS,
  };
}

function receiveProductDetails(productData, reviewData) {
  return {
    type: RECEIVE_PRODUCT_DETAILS,
    productData,
    reviewData,
  };
}

/**
 * Thunk action creator
 */
export function fetchProductDetails(productId) {
  return (dispatch) => {
    dispatch(requestProductDetails());
    return Promise.all([
      getProductDetails(productId),
      getProductReviewSummary(productId),
    ]).then(([productData, reviewData]) => {
      dispatch(receiveProductDetails(productData, reviewData));
    });
  };
}
