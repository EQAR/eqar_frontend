import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTIONS } from '../../../config';


function getInstitutions() {

  store.dispatch((dispatch) => {
<<<<<<< HEAD
    axios.get(GET_INSTITUTIONS).then((response) => {
=======
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions/?query=&country=74&qf_ehea_level=').then((response) => {
>>>>>>> master
      dispatch({ type: 'GET_INSTITUTION', payload: response.data.results});
    });
  });
}

export default getInstitutions;
