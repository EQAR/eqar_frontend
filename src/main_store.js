import { applyMiddleware, combineReducers, createStore } from 'redux';
import loginReducer from './views/Login/Reducer/login_reducer';


const reducers = combineReducers({
  login: loginReducer
});

const store = createStore(reducers);

export default store;
