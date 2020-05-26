import {
  CREATE_ORDER, UPDATE_ORDER, CLEAR_ORDER, SYNCING_STARTED, SYNCING_STOPPED, REHYDRATE_CHECKOUT,
} from '../actions/checkout';

const checkout = (state = { isSyncing: false }, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_ORDER:
      newState.orderId = action.orderId;
      newState.orderTotal = action.orderTotal;
      newState.paymentIntentSecret = action.paymentIntentSecret;
      newState.lastSync = action.lastSync;
      newState.isSyncing = false;
      return newState;
    case UPDATE_ORDER:
      newState.orderId = action.orderId;
      newState.orderTotal = action.orderTotal;
      newState.paymentIntentSecret = action.paymentIntentSecret;
      newState.lastSync = action.lastSync;
      newState.isSyncing = false;
      return newState;
    case CLEAR_ORDER:
      return { isSyncing: false };
    case SYNCING_STARTED:
      newState.isSyncing = true;
      return newState;
    case SYNCING_STOPPED:
      newState.isSyncing = false;
      return newState;
    case REHYDRATE_CHECKOUT:
      return { ...action.checkout };
    default:
      return state;
  }
};

export default checkout;
