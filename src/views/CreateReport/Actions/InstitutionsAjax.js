import axios from 'axios';
import store from '../../../main_store';


function getInstitutions(username, password) {

  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions?query=&country=74&qf_ehea_level=').then((response) => {
      dispatch({ type: 'GET_INSTITUTIONS', payload: response.data.results});
    });
  });
}

export default getInstitutions;
