import localStorage from 'store2';
import { createOrder as createOrderAPI } from '../../api/Order';

export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const SYNCING_STARTED = 'SYNCING_STARTED';
export const SYNCING_STOPPED = 'SYNCING_STOPPED';

export const REHYDRATE_CHECKOUT = 'REHYDRATE_CHECKOUT';

/*
 * {
 *  orderID,
 *  orderTotal,
 *  paymentIntentSecret,
 *  lastSync,
 *  isSyncing
 * }
 */
function createOrder(orderId, orderTotal, paymentIntentSecret, lastSync) {
  return {
    type: CREATE_ORDER,
    orderId,
    orderTotal,
    paymentIntentSecret,
    lastSync,
  };
}

function updateOrder(orderId, orderTotal, paymentIntentSecret, lastSync) {
  return {
    type: UPDATE_ORDER,
    orderId,
    orderTotal,
    paymentIntentSecret,
    lastSync,
  };
}

function clearOrder(orderId) {
  return {
    type: CLEAR_ORDER,
    orderId,
  };
}

function syncingStarted(orderId = null) {
  return {
    type: SYNCING_STARTED,
    orderId,
  };
}

function syncingStopped(orderId = null) {
  return {
    type: SYNCING_STOPPED,
    orderId,
  };
}


function rehydrateCheckoutAction(checkout) {
  return {
    type: REHYDRATE_CHECKOUT,
    checkout,
  };
}

function saveCheckoutToLocalStorage(cart) {
  localStorage.set('cart', cart, true);
}


/**
 * Thunk action creator
 */
export function updateCheckout() {
  return (dispatch, getState) => {
    const {
      checkout: {
        orderId, stripeIntentSecret, orderTotal, isSynced, isSyncing,
      }, cart: { items },
    } = getState();

    if (!isSynced && !isSyncing) {
      if (!orderId) {
        const startTime = Date.now();
        dispatch(syncingStarted());
        dispatch(updateOrder(items));
        dispatch(syncingStopped());
        const { checkout: newCheckout } = getState();
        saveCheckoutToLocalStorage(newCheckout);
      } else {
        dispatch(updateOrder(orderId, items));
      }
    }
  };
}

/**
 * Thunk action creator
 */
export function startCheckout() {
  return (dispatch, getState) => {
    const {
      checkout: {
        orderId, isSyncing,
      }, cart: { items },
    } = getState();

    if (!orderId && !isSyncing) {
      const startTime = Date.now();
      dispatch(syncingStarted());
      const response = createOrderAPI(items);
      if (response.success) {
        dispatch(createOrder({ ...response.data, startTime }));
      }
      const { checkout: newCheckout } = getState();
      dispatch(syncingStopped());
      saveCheckoutToLocalStorage(newCheckout);
    } else {
      updateCheckout();
    }
  };
}

/**
 * Thunk action creator
 */
export function checkoutComplete() {
  return (dispatch, getState) => {
    const {
      checkout: {
        orderId, stripeIntentSecret, orderTotal, isSynced, isSyncing,
      },
      cart: { items },
    } = getState();

    if (!isSyncing && orderId) {
      dispatch(clearOrder());
      const { checkout: newCheckout } = getState();
      saveCheckoutToLocalStorage(newCheckout);
    } else {
      dispatch(updateOrder(orderId, items));
    }
  };
}


/**
 * Thunk action creator
 */
export function rehydrateCheckout() {
  return (dispatch) => {
    const checkout = localStorage.get('checkout');
    if (checkout) {
      dispatch(rehydrateCheckoutAction(checkout));
    }
  };
}
