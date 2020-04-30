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
      const foundIndex = newState.findIndex((item) => item.productId === action.productId);
      if (foundIndex !== -1) {
        newState[foundIndex].quantity = action.quantity;
      }
      return [...newState];
    case DELETE_ITEM:
      const indexOfElement = newState.findIndex((item) => item.productId === action.productId);
      if (indexOfElement !== -1) {
        newState.splice(indexOfElement, 1);
      }
      return [...newState];
    case REHYDRATE_CART:
      return [...action.cart];
    default:
      return state;
  }
};

export default cart;
