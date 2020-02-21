import localStorage from 'store2';
import getCurrentUser from '../../api/Auth';

export const AUTH_ADD_TOKEN = 'AUTH_ADD_TOKEN';
export const AUTH_REQUEST_USER = 'AUTH_REQUEST_USER';
export const AUTH_RECEIVED_USER = 'AUTH_RECEIVED_USER';
export const AUTH_REHYDRATE = 'AUTH_REHYDRATE';

function addToken(authToken) {
  return {
    type: AUTH_ADD_TOKEN,
    authToken,
  };
}

function requestUserDetails() {
  return {
    type: AUTH_REQUEST_USER,
  };
}

function receiveUserDetails(userData) {
  return {
    type: AUTH_RECEIVED_USER,
    userData,
  };
}


/**
 * Thunk action creator
 */
export function auth(token) {
  return (dispatch) => {
    dispatch(addToken(token));
    dispatch(requestUserDetails());
    return getCurrentUser(token).then((userData) => dispatch(receiveUserDetails(userData)));
  };
}

/**
 * Thunk action creator
 */
export function authRehydrate() {
  return (dispatch) => {
    const authLocal = localStorage.get('auth');
    if (authLocal && authLocal.token) {
      dispatch(addToken(authLocal.token));
      return dispatch(receiveUserDetails(authLocal.user.data));
    }
  };
}
