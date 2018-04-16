import axios from 'axios';
import store from '../../../main_store';


function sendForm(formDatas) {
  console.log(formDatas);
  let formData = new FormData();
  formData.append('agency', formDatas.agency);
  formData.append('activity', formDatas.activity);
  formData.append('decision', formDatas.decision);
  formData.append('institutions', formDatas.institutions);
  formData.append('programmes', formDatas.programmes);
  formData.append('reportFiles', formDatas.reportFiles);
  formData.append('reportLinks', formDatas.reportLinks);
  formData.append('status', formDatas.status);
  formData.append('validForm', formDatas.validForm);
  formData.append('validTo', formDatas.validTo);

  console.log(formData.get('agency'), typeof formData)
  axios.post('https://witty-team.glitch.me/submissionapi/v1/submit/report/', {formData}, { headers: { 'Content-Type': 'multipart/form-data' } })
  .then((response) => {
    console.log(response)
  });
}

export default sendForm;
