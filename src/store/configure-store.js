import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './combine-reducers';

const configureStore = (initialState = {}) => {
  const middlewares = []; // you can add middleware like "thunk" here
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return createStore(reducers, initialState, composeEnhancers(...enhancers));
};

export default configureStore();
