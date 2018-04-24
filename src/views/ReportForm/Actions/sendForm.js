import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';
import { clearReportRequest } from './clearReportRequest';


function sendForm(formDatas) {
  const formRequest = clearReportRequest(formDatas);
  axios.post('https://backend.deqar.eu/submissionapi/v1/submit/report', formRequest, {
        headers: {'Content-Type': 'application/json'}})
  .then((response) => {
    store.dispatch(type: 'RESET_REPORTFORM');
    store.dispatch(push('/'));
  }).catch((err) => {
    store.dispatch({type: 'CHANGE_ALERT', alertDisplay: true, errorMessage: err.response.data.errors })
  });
}

export default sendForm;
