import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import loginReducer from './views/Login/Reducer/login_reducer';
import logger from 'redux-logger';


const reducers = combineReducers({
  login: loginReducer,
  routing: routerReducer
});

const middleWare = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleWare);

// export const history = syncHistoryWithStore(createHistory(), store);

export default store;
