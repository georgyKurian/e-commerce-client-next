import { getReviews } from '../../api/Review';

export const REQUEST_REVIEWS = 'REQUEST_REVIEWS';
export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';

function requestReviews() {
  return {
    type: REQUEST_REVIEWS,
  };
}

function receiveReviews(reviewsDataList) {
  return {
    type: RECEIVE_REVIEWS,
    reviewsDataList,
  };
}

/**
 * Thunk action creator
 */
export function fetchReviews(productId) {
  return (dispatch) => {
    dispatch(requestReviews());
    return getReviews(productId)
      .then((reviewsDataList) => dispatch(receiveReviews(reviewsDataList)));
  };
}
