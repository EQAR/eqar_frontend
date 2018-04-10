import axios from 'axios';
import store from '../../../main_store';


function getAgencies() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/agency/').then((response) => {
      dispatch({ type: 'GET_AGENCIES', payload: response.data});
    });
  });
}

export default getAgencies;
