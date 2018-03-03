import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './views/Login/Reducer/login_reducer';
import logger from 'redux-logger';


const reducers = combineReducers({
  login: loginReducer
});

const middleWare = applyMiddleware(thunk, logger);

const store = createStore(reducers, middleWare);

export default store;
