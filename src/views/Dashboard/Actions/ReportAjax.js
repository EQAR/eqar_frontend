import { push } from 'redux-first-routing';
import axios from 'axios';
import store from '../../../main_store';


function getReport(username, password) {

  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/reports_by_agency').then((response) => {
      dispatch({ type: 'GET_REPORTS', payload: response.data});
    });
  });
}

export default getReport;
