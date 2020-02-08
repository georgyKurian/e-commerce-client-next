import { getProducts } from "../../api/Product";

export const ADD_TOKEN = "ADD_PRODUCTS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVED_USER = "RECEIVED_USER";

function addToken(token) {
  return {
    type: ADD_TOKEN,
    token
  };
}

function requestUserDetails(){
  return {
    type: REQUEST_USER,
  };
}

function receiveUserDetails(userData) {
  return {
    type: RECEIVED_USER,
    userData
  };
}


/**
 * Thunk action creator
 */
export function verifyToken(token) {
  return function(dispatch) {
    dispatch(requestUserDetails());
    return getProducts(token).then(userData =>
      dispatch(receiveUserDetails(userData))
    );
  };
}
