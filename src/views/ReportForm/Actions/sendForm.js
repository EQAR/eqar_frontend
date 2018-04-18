import axios from 'axios';
import store from '../../../main_store';


function sendForm(formDatas) {
  formDatas.date_format = '%Y-%m-%d';
  formDatas.institutions = formDatas.institutions.map(institution => {
    return {deqar_id: institution.deqar_id}})
  axios.post('https://backend.deqar.eu/submissionapi/v1/submit/report', formDatas, {
        headers: {'Content-Type': 'application/json'}})
  .then((response) => {
    console.log(response.data)
  }).catch((err) => {
    console.log(err.response.data)
  });
}

export default sendForm;
