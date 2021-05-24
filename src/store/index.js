import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as api from '../api';


function logger(store) {
  return function (next) {
    return function (action) {
      console.log('***dispatching', action);
      let result = next(action);
      console.log('***next state', store.getState());
      return result;
    };
  };
}

const configureStore = ({ preloadedState, history }) => {
  /*
  const middleware = [
    routerMiddleware(history),
    thunk.withExtraArgument({ api, history }),
    logger,
  ];*/

  const store = createStore(
    combineReducers({ ...reducers, router: connectRouter(history) }),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  return store;
};

export default configureStore;

