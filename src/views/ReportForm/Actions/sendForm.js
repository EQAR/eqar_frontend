import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';
import { clearReportRequest } from './clearReportRequest';
import sendFiles from './sendFiles';
import lodash from 'lodash'


function sendForm(formDatas) {
  const formRequest = clearReportRequest(formDatas);
  axios.post('https://backend.deqar.eu/submissionapi/v1/submit/report', formRequest, {
        headers: {'Content-Type': 'application/json'}})
  .then((response) => {
    if (!lodash.isEmpty(response.data.report_warnings)) {
      if (response.data.report_warnings.includes('File location was not provided.')) {
        sendFiles(formDatas.report_files, response.data.submitted_report.files);
      }
    }
    store.dispatch({type: 'RESET_REPORT_FORM'});
    store.dispatch(push('/'));
  }).catch((err) => {
    console.log(err);
    store.dispatch({type: 'CHANGE_ALERT', alertDisplay: true, errorMessage: err.response.data.errors })
  });
}

export default sendForm;
