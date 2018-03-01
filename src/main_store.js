import { applyMiddleware, combineReducers, createStore } from 'redux';


const reducers = combineReducers({
  login: loginReducer
});

const store = createStore(reducers);

export default store;
