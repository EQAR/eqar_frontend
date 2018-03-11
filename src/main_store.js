import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, routerReducer, routerMiddleware, startListener } from 'redux-first-routing';
import thunk from 'redux-thunk';
import loginReducer from './views/Login/Reducer/login_reducer';

export const history = createBrowserHistory();

const reducers = combineReducers({
  login: loginReducer,
  router: routerReducer
});

const middleWare = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const store = createStore(reducers, middleWare);

startListener(history, store);

export default store;
