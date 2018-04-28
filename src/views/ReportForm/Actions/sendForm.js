import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';
import { clearReportRequest } from './clearReportRequest';
import sendFiles from './sendFiles';
import lodash from 'lodash'


function reportAjax(formDatas) {

}

function sendForm(formDatas) {
  const formRequest = clearReportRequest(formDatas);
  axios.post('https://backend.deqar.eu/submissionapi/v1/submit/report', formRequest, { headers: {'Content-Type': 'application/json'}})
  .then(response => {
    Promise.all(sendFiles(formDatas.report_files, response.data))
    .then(response => {
      store.dispatch({type: 'RESET_REPORT_FORM'});
      store.dispatch(push('/'));
    })
    .catch(error => console.log(error.response));
  })
  .catch(error => {
    store.dispatch({type: 'CHANGE_ALERT', alertDisplay: true, errorMessage: error.response.data.errors })
  });
}

export default sendForm;
