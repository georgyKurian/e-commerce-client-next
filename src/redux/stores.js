import reducers from "../redux/reducers/index";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

export const initStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, /* loggerMiddleware */)
    )
  );
};

/**
 * state {
 *  products: {
 *    isFetching: false,
 *    didInvalidate: false,
 *    lastUpdated: 1439478405547,
 *     items: [
 *        {product1},
 *        {product2}
 *     ]
 *  }
 * }
 */
