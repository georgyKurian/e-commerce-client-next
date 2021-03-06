import localStorage from 'store2';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const REMOVE_ALL = 'REMOVE_ALL';

export const REHYDRATE_CART = 'REHYDRATE_CART';

/*
 {
    items:[],
    cartTotal,
    lastUpdated
 }
 */

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

function updateItem(productId, quantity) {
  return {
    type: UPDATE_ITEM,
    productId,
    quantity,
  };
}

function clearCart() {
  return {
    type: REMOVE_ALL,
  };
}

function rehydrateCartAction(cart) {
  return {
    type: REHYDRATE_CART,
    cart,
  };
}

function saveCartToLocalStorage(getState) {
  const { cart: newCart } = getState();
  localStorage.set('cart', newCart, true);
}

/**
 * Thunk action creator
 */
export function addToCart(productId, quantity = 1) {
  return (dispatch, getState) => {
    const { cart } = getState();
    const foundIndex = cart.items.findIndex((item) => item.productId === productId);
    if (foundIndex === -1) {
      dispatch(addItem(productId, quantity));
    } else {
      dispatch(updateItem(productId, (cart.items[foundIndex].quantity + quantity)));
    }
    saveCartToLocalStorage(getState);
  };
}

/**
 * Thunk action creator
 */
export function removeFromCart(productId) {
  return (dispatch, getState) => {
    dispatch(deleteItem(productId));
    saveCartToLocalStorage(getState);
  };
}

/**
 * Thunk action creator
 */
export function updateCartQuantity(productId, quantity) {
  return (dispatch, getState) => {
    dispatch(updateItem(productId, quantity));
    saveCartToLocalStorage(getState);
  };
}

/**
 * Thunk action creator
 */
export function rehydrateCart() {
  return (dispatch) => {
    const cart = localStorage.get('cart');
    if (cart?.items?.length) {
      dispatch(rehydrateCartAction(cart));
    }
  };
}

/**
 * Thunk action creator
 */
export function clearShoppingCart() {
  return (dispatch, getState) => {
    dispatch(clearCart());
    saveCartToLocalStorage(getState);
  };
}
