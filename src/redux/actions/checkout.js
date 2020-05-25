import localStorage from 'store2';

export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const CLEAR_ORDER = 'CLEAR_ORDER';
export const START_SYNCING = 'START_SYNCING';

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
function createOrder(orderId,orderTotal,paymentIntentSecret,lastSync) {
  return {
    type: CREATE_ORDER,
    orderId,
    orderTotal,
    paymentIntentSecret,
    lastSync
  };
}

function updateOrder(orderId,orderTotal,paymentIntentSecret,lastSync) {
    return {
      type: UPDATE_ORDER,
      orderId,
      orderTotal,
      paymentIntentSecret,
      lastSync
    };
}

function clearOrder(orderId) {
  return {
    type: CLEAR_ORDER,
    orderId,
  };
}

function startSyncing(orderId=null) {
  return {
    type: START_SYNCING,
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
export function startCheckout() {
  return (dispatch, getState) => {
    const { checkout: { orderId, stripeIntentSecret, orderTotal, isSynced, isSyncing }, cart: {items} } = getState();

      if (!orderId && !isSyncing) {
        dispatch(startSyncing());
        dispatch(createOrder(items));
        const { checkout: newCheckout}  = getState();
        saveCheckoutToLocalStorage (newCheckout);;
      }
      else {
        updateCheckout();
      }
  };
}

/**
 * Thunk action creator
 */
export function updateCheckout() {
    return (dispatch, getState) => {
      const { checkout: { orderId, stripeIntentSecret, orderTotal, isSynced, isSyncing }, cart:{items} } = getState();
  
      if (!isSynced && !isSyncing) {
        if (!orderId) {
          dispatch(startSyncing());
          dispatch(updateOrder(items));
          const { checkout: newCheckout}  = getState();
          saveCheckoutToLocalStorage (newCheckout);;
        }
        else {
          dispatch(updateOrder(orderId, items));
        }
      }  
    };
  }

/**
 * Thunk action creator
 */
export function checkoutComplete() {
    return (dispatch, getState) => {
      const { checkout: { orderId, stripeIntentSecret, orderTotal, isSynced, isSyncing } } = getState();
  
      if (!isSyncing && orderId) {
          dispatch(clearCheckout());
          const { checkout: newCheckout}  = getState();
          saveCheckoutToLocalStorage (newCheckout);
        }
        else {
          dispatch(updateOrder(orderId, items));
        }
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
