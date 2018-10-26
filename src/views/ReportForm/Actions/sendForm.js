import axios from 'axios';
import store from '../../../main_store';
import { clearReportRequest } from './clearReportRequest';
import sendFiles from './sendFiles';
import lodash from 'lodash';
import { POST_REPORT } from '../../../config';



export default function sendForm(formDatas) {
  const formRequest = clearReportRequest(formDatas);
  store.dispatch({type: 'SPINNER_START'});
  axios.post(POST_REPORT, formRequest, { headers: {'Content-Type': 'application/json'}})
  .then(response => {
    let warnings = getWarnings(response.data);
    Promise.all(sendFiles(formDatas.report_files, response.data))
    .then(response => {
      store.dispatch({type: 'SPINNER_STOP'});
      store.dispatch({type: 'UPLOAD_FINISH', payload: warnings});
    })
    .catch(error => {
      store.dispatch({type: 'SPINNER_STOP'});
      store.dispatch({type: 'CHANGE_ERROR',
                      error: true, 
                      errorMessage: 
                        {
                          report_files: [{
                            error: ['There was an error posting the report file']
                          }]
                        }
                      })
    });
  })
  .catch(error => {
    store.dispatch({type: 'SPINNER_STOP'})
    error.response.data.errors ?
      store.dispatch({type: 'CHANGE_ERROR', error: true, errorMessage: error.response.data.errors }) :
      store.dispatch({type: 'CHANGE_ERROR', error: true, errorMessage: {other: [{error: ['There was an error posting the report']}]} })
  });
}

function getWarnings(response) {
  let warnings = response.report_warnings.filter(element => element !== 'File location was not provided.')
  return lodash.concat(warnings, response.institution_warnings);
}
