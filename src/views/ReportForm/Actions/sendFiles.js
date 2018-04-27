import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';
import { clearReportRequest } from './clearReportRequest';
import lodash from 'lodash';


function sendFiles(formDatas, files) {
  lodash.reverse(formDatas)
  files.forEach((file, i) => {
    if (file.file_original_location === '') {
      const fileName = getFilename(file, formDatas, i);
      axios.put(`https://backend.deqar.eu/submissionapi/v1/submit/reportfile/${file.id}/${fileName}`, formDatas[i].uploaded_file[0], {
        headers: {'Content-Type': 'application/json'}})
        .then((response) => {
          console.log(response);
        }).catch((err) => {
          console.log(err.response);
        });
    }
  });
}

function getFilename(file, formDatas, i) {
  return file.file_display_name !== '' ? file.file_display_name : formDatas[i].uploaded_file[0].name;
}

export default sendFiles;
