import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

const makeConfiguredStore = (reducer, initialState) => createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware),
  ),
);

const initStore = (initialState = {}, { isServer }) => {
  if (isServer) {
    return makeConfiguredStore(reducers, initialState);
  }
  return makeConfiguredStore(reducers, initialState);
};

export default initStore;
