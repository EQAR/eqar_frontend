import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, routerReducer, routerMiddleware, startListener } from 'redux-first-routing';
import thunk from 'redux-thunk';
import loginReducer from './views/Login/Reducer/login_reducer';
import reportReducer from './views/Dashboard/Reducer/ReportReducer';
import dashboardReducer from './views/Dashboard/Reducer/dashboardReducer';
import reportFormReducer from './views/ReportForm/reducers/reportFormReducer';
import institutionReferencesReducer from './views/Institutions/Reducers/institutionsReducer'
import institutionsReducer from './components/InstitutionsTable/Reducers/institutionsReducer';
import countriesReducer from './components/InstitutionsTable/Reducers/countriesReducer';
import agencyReducer from './views/ReportForm/CoreData/agencyReducer';
import agenciesReducer from './views/ReportForm/CoreData/agenciesReducer';
import activityReducer from './views/ReportForm/CoreData/activityReducer';
import programmeReducer from './views/ReportForm/Programmes/programmeReducer';
import qfeheaReducer from './views/ReportForm/Programmes/qfeheaReducer';
import fileReducer from './views/ReportForm/ReportFiles/fileReducer';
import languagesReducer from './views/ReportForm/ReportFiles/languagesReducer';
import { reducer as formReducer } from 'redux-form';

export const history = createBrowserHistory();

const reducers = combineReducers({
  activities: activityReducer,
  agencies: agenciesReducer,
  agency: agencyReducer,
  countries: countriesReducer,
  dashboard: dashboardReducer,
  institutions: institutionsReducer,
  institutionsRef: institutionReferencesReducer,
  login: loginReducer,
  languages: languagesReducer,
  programme: programmeReducer,
  qfeheaLevels: qfeheaReducer,
  reportFile: fileReducer,
  reportForm: reportFormReducer,
  reports: reportReducer,
  router: routerReducer,
  form: formReducer
});

const middleWare = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const store = createStore(reducers, middleWare);

startListener(history, store);

export default store;
