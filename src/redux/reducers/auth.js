import { combineReducers } from 'redux';
import { AUTH_ADD_TOKEN, AUTH_REQUEST_USER, AUTH_RECEIVED_USER } from '../actions/auth';

const token = (state = null, action) => {
  switch (action.type) {
    case AUTH_ADD_TOKEN:
      return { ...state, user: action.userData };
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REQUEST_USER:
      return { ...state, isFetching: true };
    case AUTH_RECEIVED_USER:
      return {
        ...state, isFetching: false, isInvalidated: false, data: action.user,
      };
    default:
      return state;
  }
};

export default combineReducers({ token, user });
