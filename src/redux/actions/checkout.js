import localStorage from 'store2';
import {
  createOrder as createOrderAPI,
  updateOrderItems as updateOrderItemsAPI,
  updateOrderAddress, updateOrderStatus,
} from '../../api/Order';

export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const SET_ORDER_BILLING_ADDRESS = 'SET_ORDER_BILLING_ADDRESS';
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
function createOrder(order, lastSync) {
  return {
    type: CREATE_ORDER,
    ...order,
    lastSync,
  };
}

function updateOrder(order, lastSync) {
  return {
    type: UPDATE_ORDER,
    ...order,
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
  localStorage.set('checkout', cart, true);
}

const createCheckoutOrder = (dispatch, getState, items) => {
  const startTime = Date.now();
  dispatch(syncingStarted());
  return createOrderAPI(items)
    .then((response) => {
      if (response.success) {
        dispatch(createOrder(response.data, startTime));
      } else {
        dispatch(syncingStopped());
      }
    }, () => { dispatch(syncingStopped()); })
    .then(() => {
      const { checkout: newCheckout } = getState();
      saveCheckoutToLocalStorage(newCheckout);
    });
};

const updateCheckoutOrder = (dispatch, getState, orderId, items) => {
  const startTime = Date.now();
  dispatch(syncingStarted());
  return updateOrderItemsAPI(orderId, items)
    .then((response) => {
      if (response.success) {
        dispatch(updateOrder(response.data, startTime));
      } else {
        dispatch(syncingStopped());
      }
    }, () => { dispatch(syncingStopped()); })
    .then(() => {
      const { checkout: newCheckout } = getState();
      saveCheckoutToLocalStorage(newCheckout);
    });
};

/**
 * Thunk action creator
 */
export function startCheckout() {
  return (dispatch, getState) => {
    const {
      checkout: {
        order: { _id: orderId }, isSyncing, lastSync,
      }, cart: { items, lastUpdated },
    } = getState();

    if (!(lastSync && lastUpdated && lastSync >= lastUpdated) && !isSyncing) {
      if (!orderId) {
        if (items.length === 0) {
          return null;
        }
        return createCheckoutOrder(dispatch, getState, items);
      }
      return updateCheckoutOrder(dispatch, getState, orderId, items);
    }
    return null;
  };
}

/**
 * Thunk action creator
 */
export function updateCheckoutBillingAddress(billingAddress) {
  return (dispatch, getState) => {
    const {
      checkout: {
        order: { _id: orderId },
      },
    } = getState();
    updateOrderAddress(orderId, billingAddress)
      .then((response) => {
        if (response.success) {
          dispatch(updateOrder(response.data));
        }
      })
      .then(() => {
        const { checkout: newCheckout } = getState();
        saveCheckoutToLocalStorage(newCheckout);
      });
  };
}

/**
 * Thunk action creator
 */
export function checkoutComplete() {
  return (dispatch, getState) => {
    const {
      checkout: {
        order: { _id: orderId },
      },
    } = getState();

    if (orderId) {
      updateOrderStatus(orderId, 'Paid')
        .finally(() => {
          dispatch(clearOrder());
          const { checkout: newCheckout } = getState();
          saveCheckoutToLocalStorage(newCheckout);
        });
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
