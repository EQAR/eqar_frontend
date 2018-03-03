import { applyMiddleware, combineReducers, createStore } from 'redux';
import loginReducer from './views/Login/Reducer/login_reducer';
import logger from 'redux-logger';


const reducers = combineReducers({
  login: loginReducer
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;
