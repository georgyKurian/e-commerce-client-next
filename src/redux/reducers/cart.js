import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../actions/cart';

const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      state.push({
        productId: action.productId,
        quantity: action.quantity,
      });
      return [...state];
    case UPDATE_ITEM:
      state[action.itemIndex].quantity += action.quantity;
      return [...state];
    case DELETE_ITEM:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        lastFetched: Date.now(),
        items: action.productDataList,
      };
    default:
      return state;
  }
};

export default cart;
