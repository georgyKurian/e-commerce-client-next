import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

const loggerMiddleware = createLogger();

export default (initialState = {}) => createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware /* loggerMiddleware */),
  ),
);

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
