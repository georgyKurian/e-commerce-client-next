import { REQUEST_REVIEWS, RECEIVE_REVIEWS } from "../actions/reviews";

const reviews = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_REVIEWS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_REVIEWS:
      debugger;
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastFetched: Date.now(),
        items: action.reviewsDataList
      });
    default:
      return state;
  }
};

export default reviews;
