import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

const loggerMiddleware = createLogger();

const makeConfiguredStore = (reducer, initialState) => createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware /* loggerMiddleware */),
  ),
);


export default (initialState = {}, { isServer }) => {
  if (isServer) {
    return makeConfiguredStore(reducers, initialState);
  }
  const { persistStore, persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'nextjs',
    whitelist: ['fromClient'], // make sure it does not clash with server keys
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = makeConfiguredStore(persistedReducer, initialState);

  store.__persistor = persistStore(store); // Nasty hack

  return store;
};
