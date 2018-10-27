import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createBrowserHistory, routerReducer, routerMiddleware, startListener } from 'redux-first-routing';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from './views/Login/Reducers/login_reducer';
import reportReducer from './views/Dashboard/Reducers/reportReducer';
import dashboardReducer from './views/Dashboard/Reducers/dashboardReducer';
import reportFormReducer from './views/ReportForm/Reducers/reportFormReducer';
import institutionsReferencesReducer from './views/services/InstitutionsReferenceTable/institutionsReducer'
import institutionFormReducer from './views/services/InstitutionForm/institutionFormReducer'
import countriesReducer from './views/services/countries/countriesReducer';
import agencyReducer from './views/ReportForm/CoreData/agencyReducer';
import agenciesReducer from './views/ReportForm/CoreData/agenciesReducer';
import activityReducer from './views/ReportForm/CoreData/activityReducer';
import statusReducer from './views/ReportForm/CoreData/statusReducer';
import decisionReducer from './views/ReportForm/CoreData/decisionReducer';
import programmeReducer from './views/ReportForm/Programmes/programmeReducer';
import qfeheaReducer from './views/ReportForm/Programmes/qfeheaReducer';
import fileReducer from './views/ReportForm/ReportFiles/fileReducer';
import languagesReducer from './views/ReportForm/ReportFiles/languagesReducer';
import messageReducer from './views/services/MessageModal/messageReducer';
import csvReducer from "./views/CSVUpload/Reducers/csvReducer";


export const history = createBrowserHistory();

const reducers = combineReducers({
  activities: activityReducer,
  agencies: agenciesReducer,
  agency: agencyReducer,
  message: messageReducer,
  countries: countriesReducer,
  dashboard: dashboardReducer,
  decisions: decisionReducer,
  institutionsRef: institutionsReferencesReducer,
  institutionForm: institutionFormReducer,
  login: loginReducer,
  languages: languagesReducer,
  programme: programmeReducer,
  qfeheaLevels: qfeheaReducer,
  reportFile: fileReducer,
  reportForm: reportFormReducer,
  reports: reportReducer,
  csvData: csvReducer,
  router: routerReducer,
  statuses: statusReducer
});

const middleWare = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const store = createStore(reducers, middleWare);

startListener(history, store);

export default store;
