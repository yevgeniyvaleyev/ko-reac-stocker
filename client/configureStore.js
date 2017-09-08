import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import stocksApp from './reducers';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  middlewares.push(thunk);

  return createStore(
    stocksApp,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default configureStore;
