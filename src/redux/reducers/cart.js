/* eslint-disable no-case-declarations */
import {
  ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, REHYDRATE_CART,
} from '../actions/cart';

const cart = (state = { items: [] }, action) => {
  const newState = { ...state };
  const lastUpdated = Date.now();

  switch (action.type) {
    case ADD_ITEM:
      newState.lastUpdated = lastUpdated;
      newState.items = [...state.items];
      newState.items.push({
        productId: action.productId,
        quantity: action.quantity,
      });
      return newState;
    case UPDATE_ITEM:
      newState.lastUpdated = lastUpdated;
      const foundIndex = newState.items.findIndex((item) => item.productId === action.productId);
      if (foundIndex !== -1) {
        newState.items = [...state.items];
        newState.items[foundIndex].quantity = action.quantity;
        return newState;
      }
      return state;
    case DELETE_ITEM:
      newState.lastUpdated = lastUpdated;
      const indexOfElement = newState.items.findIndex(
        (item) => item.productId === action.productId,
      );
      if (indexOfElement !== -1) {
        newState.items = [...newState.items];
        newState.items.splice(indexOfElement, 1);
        return newState;
      }
      return state;
    case REHYDRATE_CART:
      return { ...action.cart };
    default:
      return state;
  }
};

export default cart;
