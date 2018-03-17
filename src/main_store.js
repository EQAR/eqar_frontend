import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, routerReducer, routerMiddleware, startListener } from 'redux-first-routing';
import thunk from 'redux-thunk';
import loginReducer from './views/Login/Reducer/login_reducer';
import reportReducer from './views/Dashboard/Reducer/ReportReducer.js';
import badgeReducer from './views/Dashboard/Reducer/BadgeReducer';
import reportFormReducer from './views/CreateReport/Reducers/reportFormReducer.js';
import institutionsReducer from './views/CreateReport/Reducers/institutionsReducer.js';
import coutriesReducer from './components/InstitutionsTable/Reducers/countriesReducer.js'

export const history = createBrowserHistory();

const reducers = combineReducers({
  login: loginReducer,
  reports: reportReducer,
  dashboardBadges: badgeReducer,
  reportForm: reportFormReducer,
  institutions: institutionsReducer,
  countries: coutriesReducer,
  router: routerReducer
});

const middleWare = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const store = createStore(reducers, middleWare);

startListener(history, store);

export default store;
