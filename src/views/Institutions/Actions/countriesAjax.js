import axios from 'axios';
import store from '../../../main_store';

function countriesAjax() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions/country/').then((response) => {
      dispatch({ type: 'GET_COUNTRIES', payload: response.data});
    });
  });
}

export default countriesAjax;
