import {
  CREATE_ORDER, UPDATE_ORDER, CLEAR_ORDER, SYNCING_STARTED, SYNCING_STOPPED, REHYDRATE_CHECKOUT,
} from '../actions/checkout';

const initialState = {
  isSyncing: false,
  lastSync: null,
  paymentIntentSecret: null,
  order: {},
};

const Checkout = (state = { ...initialState }, {
  type, paymentIntentSecret, lastSync, checkout, ...order
}) => {
  const newState = { ...state };
  switch (type) {
    case CREATE_ORDER:
      newState.order = order;
      newState.paymentIntentSecret = paymentIntentSecret;
      newState.lastSync = lastSync;
      newState.isSyncing = false;
      return newState;
    case UPDATE_ORDER:
      newState.order = order;
      if (paymentIntentSecret) {
        newState.paymentIntentSecret = paymentIntentSecret;
      }
      if (lastSync) {
        newState.lastSync = lastSync;
      }
      newState.isSyncing = false;
      return newState;
    case CLEAR_ORDER:
      return { ...initialState };
    case SYNCING_STARTED:
      newState.isSyncing = true;
      return newState;
    case SYNCING_STOPPED:
      newState.isSyncing = false;
      return newState;
    case REHYDRATE_CHECKOUT:
      return { ...checkout };
    default:
      return state;
  }
};

export default Checkout;
