import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';
import { clearReportRequest } from './clearReportRequest';
import lodash from 'lodash';


function sendFiles(formDatas, responseDatas) {
  lodash.reverse(formDatas)
  if (!lodash.isEmpty(responseDatas.report_warnings)) {
    if (responseDatas.report_warnings.includes('File location was not provided.')) {
      return responseDatas.submitted_report.files.map((file, i) => {
        return new Promise ((resolve, reject) => {
          if (file.file_original_location === '') {
            const fileName = getFilename(file, formDatas, i);
            axios.put(`https://backend.deqar.eu/submissionapi/v1/submit/reportfile/${file.id}/${fileName}`, formDatas[i].uploaded_file[0])
            .then(response => resolve(response))
            .catch(error => reject(error))
          }
        });
      });
    }
  }
  return new Promise(resolve => resolve(responseDatas))
}

function getFilename(file, formDatas, i) {
  return file.file_display_name !== '' ? file.file_display_name : formDatas[i].uploaded_file[0].name;
}

export default sendFiles;
