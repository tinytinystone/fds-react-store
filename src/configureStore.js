import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(rootReducer, applyMiddleware(...middlewares));
};

export default configureStore;
