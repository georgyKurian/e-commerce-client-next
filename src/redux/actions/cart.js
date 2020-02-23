export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REMOVE_ALL = 'REMOVE_ALL';

function addItem(productId, quantity) {
  return {
    type: ADD_ITEM,
    productId,
    quantity,
  };
}

function deleteItem(productId) {
  return {
    type: DELETE_ITEM,
    productId,
  };
}

function updateItem(itemIndex, quantity) {
  return {
    type: UPDATE_ITEM,
    itemIndex,
    quantity,
  };
}

/**
 * Thunk action creator
 */
export function addToCart(productId, quantity = 1) {
  return (dispatch, getState) => {
    const { cart } = getState();
    const foundIndex = cart.findIndex((item) => item.productId === productId);
    if (foundIndex === -1) {
      dispatch(addItem(productId, quantity));
    } else {
      dispatch(updateItem(foundIndex, (quantity)));
    }
  };
}

/**
 * Thunk action creator
 */
export function removeFromCart(productId) {
  return (dispatch) => dispatch(deleteItem(productId));
}

/**
 * Thunk action creator
 */
export function updateCartQuantity(productId, quantity) {
  return (dispatch) => dispatch(updateItem(productId, quantity));
}
