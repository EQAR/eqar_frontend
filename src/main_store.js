import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, routerReducer, routerMiddleware, startListener } from 'redux-first-routing';
import thunk from 'redux-thunk';
import loginReducer from './views/Login/Reducer/login_reducer';
import reportReducer from './views/Dashboard/Reducer/ReportReducer';
import badgeReducer from './views/Dashboard/Reducer/BadgeReducer';
import reportFormReducer from './views/ReportForm/reducers/reportFormReducer';
import institutionsReducer from './views/ReportForm/Institutions/institutionsReducer';
import coutriesReducer from './components/InstitutionsTable/Reducers/countriesReducer';
import agencyReducer from './views/ReportForm/CoreData/agencyReducer';
import agenciesReducer from './views/ReportForm/CoreData/agenciesReducer';
import activityReducer from './views/ReportForm/CoreData/activityReducer';
import programmeReducer from './views/ReportForm/Programmes/programmeReducer'

export const history = createBrowserHistory();

const reducers = combineReducers({
  login: loginReducer,
  reports: reportReducer,
  dashboardBadges: badgeReducer,
  reportForm: reportFormReducer,
  institutions: institutionsReducer,
  countries: coutriesReducer,
  agency: agencyReducer,
  agencies: agenciesReducer,
  activities: activityReducer,
  programme: programmeReducer,
  router: routerReducer
});

const middleWare = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const store = createStore(reducers, middleWare);

startListener(history, store);

export default store;
