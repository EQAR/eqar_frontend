import axios from 'axios';
import store from '../../../main_store';
import { GET_COUNTRIES } from '../../../config';

function countriesAjax() {
  store.dispatch((dispatch) => {
    axios.get(GET_COUNTRIES).then((response) => {
      dispatch({ type: 'GET_COUNTRIES', payload: response.data});
    });
  });
}

export default countriesAjax;
