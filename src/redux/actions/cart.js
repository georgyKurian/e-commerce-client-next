import localStorage from 'store2';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REMOVE_ALL = 'REMOVE_ALL';
export const REHYDRATE_CART = 'REHYDRATE_CART';

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

function rehydrateCartAction(cart) {
  return {
    type: REHYDRATE_CART,
    cart,
  };
}

function saveCartToLocalStorage(cart) {
  localStorage.set('cart', cart, true);
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
    const { cart: newCart } = getState();
    saveCartToLocalStorage(newCart);
  };
}

/**
 * Thunk action creator
 */
export function removeFromCart(productId) {
  return (dispatch, getState) => {
    dispatch(deleteItem(productId));
    const { cart: newCart } = getState();
    saveCartToLocalStorage(newCart);
  };
}

/**
 * Thunk action creator
 */
export function updateCartQuantity(productId, quantity) {
  return (dispatch, getState) => {
    dispatch(updateItem(productId, quantity));
    const { cart: newCart } = getState();
    saveCartToLocalStorage(newCart);
  };
}
/**
 * Thunk action creator
 */
export function rehydrateCart() {
  return (dispatch) => {
    const cart = localStorage.get('cart');
    if (cart) {
      dispatch(rehydrateCartAction(cart));
    }
  };
}