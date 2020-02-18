import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import { loadState, saveState } from './localStorage';

const loggerMiddleware = createLogger();

const persistedState = loadState();

export default (initialState = persistedState) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware /* loggerMiddleware */),
    ),
  );

  store.subscribe(() => {
    console.log('State changed!');
    debugger;
    saveState({ ...store.getState() });
  });
  return store;
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
