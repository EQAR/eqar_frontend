import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';


function sendForm(formDatas) {
  formDatas.date_format = '%Y-%m-%d';
  formDatas.institutions = formDatas.institutions.map(institution => {
    return {deqar_id: institution.deqar_id}})
  axios.post('https://backend.deqar.eu/submissionapi/v1/submit/report', formDatas, {
        headers: {'Content-Type': 'application/json'}})
  .then((response) => {
    store.dispatch(push('/'));
  }).catch((err) => {
    store.dispatch({type: 'CHANGE_ALERT', alertDisplay: true, errorMessage: err.response.data.errors })
  });
}

export default sendForm;
