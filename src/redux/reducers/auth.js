import { combineReducers } from 'redux';
import {
  AUTH_ADD_TOKEN, AUTH_DELETE_TOKEN, AUTH_REQUEST_USER, AUTH_RECEIVED_USER, AUTH_DELETE_USER,
} from '../actions/auth';

const token = (state = null, { type, authToken }) => {
  switch (type) {
    case AUTH_ADD_TOKEN:
      return authToken;
    case AUTH_DELETE_TOKEN:
      return null;
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
    case AUTH_DELETE_USER:
      return null;
    default:
      return state;
  }
};

export default combineReducers({ token, user });
