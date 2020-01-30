import reducers from "../redux/reducers/index";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

export const initStore = (initialState = {}) => {
  return createStore(reducers, initialState, applyMiddleware(thunk));
};
