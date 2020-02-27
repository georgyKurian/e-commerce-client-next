import {
  ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, REHYDRATE_CART,
} from '../actions/cart';

const cart = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case ADD_ITEM:
      newState.push({
        productId: action.productId,
        quantity: action.quantity,
      });
      return newState;
    case UPDATE_ITEM:
      newState[action.itemIndex].quantity += action.quantity;
      return [...newState];
    case DELETE_ITEM:
      return state;
    case REHYDRATE_CART:
      return [...action.cart];
    default:
      return state;
  }
};

export default cart;
