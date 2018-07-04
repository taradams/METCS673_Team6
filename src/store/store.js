import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from '../reducers/reducer.js';
import rootReducer from '../reducers/index.js';
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);

export const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunk)));
