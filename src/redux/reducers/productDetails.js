import { REQUEST_PRODUCT_DETAILS, RECEIVE_PRODUCT_DETAILS } from '../actions/productDetails';

const productDetails = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCT_DETAILS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_PRODUCT_DETAILS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        lastFetched: Date.now(),
        data: action.productData,
        reviewData: action.reviewData,
      };
    default:
      return state;
  }
};

export default productDetails;
