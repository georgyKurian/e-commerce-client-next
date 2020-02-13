import { combineReducers } from 'redux';
import { AUTH_ADD_TOKEN, AUTH_REQUEST_USER, AUTH_RECEIVED_USER } from '../actions/auth';

const token = (state = null, { type, authToken }) => {
  switch (type) {
    case AUTH_ADD_TOKEN:
      return { token: authToken };
    default:
      return state;
  }
};

const user = (state = {}, { type, userData }) => {
  switch (type) {
    case AUTH_REQUEST_USER:
      return { ...state, isFetching: true };
    case AUTH_RECEIVED_USER:
      return {
        ...state, isFetching: false, isInvalidated: false, data: userData,
      };
    default:
      return state;
  }
};

export default combineReducers({ token, user });
