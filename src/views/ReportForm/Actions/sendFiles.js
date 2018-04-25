import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';
import { clearReportRequest } from './clearReportRequest';


function sendFiles(formDatas, files) {
  files.forEach((file, i) => {
    const fileName = getFilename(file, formDatas, i);
    axios.put(`https://backend.deqar.eu/submissionapi/v1/submit/reportfile/${file.id}/${fileName}`, formDatas[i].uploaded_file[0], {
      headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
        // store.dispatch({type: 'CHANGE_ALERT', alertDisplay: true, errorMessage: err.response.data.errors })
      });
  });
}

function getFilename(file, formDatas, i) {
  return file.file_display_name !== '' ? file.file_display_name : formDatas[i].uploaded_file[0].name;
}

export default sendFiles;
