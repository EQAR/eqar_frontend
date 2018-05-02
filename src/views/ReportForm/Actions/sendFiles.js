import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';
import { clearReportRequest } from './clearReportRequest';
import lodash from 'lodash';


function sendFiles(formDatas, responseDatas) {
  if (!lodash.isEmpty(responseDatas.report_warnings)) {
    if (responseDatas.report_warnings.includes('File location was not provided.')) {
      return responseDatas.submitted_report.files.reverse().map((file, i) => {
        if (file.file_original_location === '') {
          return new Promise((resolve, reject) => {
            const fileName = getFilename(file, formDatas, i);
            axios.put(`https://backend.deqar.eu/submissionapi/v1/submit/reportfile/${file.id}/${fileName}`, formDatas[i].uploaded_file[0])
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
          });
        }
        return Promise.resolve(file)
      });
    }
  }
  return [Promise.resolve(responseDatas)]
}

function getFilename(file, formDatas, i) {
  return formDatas[i].uploaded_file[0].name;
}

export default sendFiles;
