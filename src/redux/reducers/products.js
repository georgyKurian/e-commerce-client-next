import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from "./../actions/products";

const products = (state = [], action) => {
  switch (action.type) {
    case "REQUEST_PRODUCTS":
      return Object.assign({}, state, {
        products: {
          isFetching: true,
          didInvalidate: false
        }
      });
    case "RECEIVE_PRODUCTS":
      return Object.assign({}, state, {
        products: {
          isFetching: false,
          didInvalidate: false,
          items: action.productDataList
        }
      });
    default:
      return state;
  }
};

export default products;
