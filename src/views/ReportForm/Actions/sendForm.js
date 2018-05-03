import axios from 'axios';
import store from '../../../main_store';
import { clearReportRequest } from './clearReportRequest';
import sendFiles from './sendFiles';
import lodash from 'lodash'


export default function sendForm(formDatas) {
  const formRequest = clearReportRequest(formDatas);
  store.dispatch({type: 'SPINNER_START'});
  axios.post('https://backend.deqar.eu/submissionapi/v1/submit/report', formRequest, { headers: {'Content-Type': 'application/json'}})
  .then(response => {
    let warnings = getWarnings(response.data);
    Promise.all(sendFiles(formDatas.report_files, response.data))
    .then(response => {
      store.dispatch({type: 'SPINNER_STOP'});
      store.dispatch({type: 'UPLOAD_FINISH', payload: warnings});
    })
    .catch(error => {
      store.dispatch({type: 'SPINNER_STOP'});
      store.dispatch({type: 'RESET_MESSAGE'});
    });
  })
  .catch(error => {
    store.dispatch({type: 'SPINNER_STOP'})
    store.dispatch({type: 'CHANGE_ERROR', error: true, errorMessage: error.response.data.errors })
  });
}

function getWarnings(response) {
  let warnings = response.report_warnings.filter(element => element !== 'File location was not provided.')
  return lodash.concat(warnings, response.institution_warnings);
}
