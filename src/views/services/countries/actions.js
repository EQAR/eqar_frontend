import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTION_COUNTRIES, GET_COUNTRIES } from '../../../config';

export function getInstituionCountries() {
  store.dispatch((dispatch) => {
    axios.get(GET_INSTITUTION_COUNTRIES).then((response) => {
      dispatch({ type: 'GET_COUNTRIES', payload: response.data});
    });
  });
}

export function getCountries() {
  store.dispatch((dispatch) => {
    axios.get(GET_COUNTRIES).then((response) => {
      dispatch({ type: 'GET_COUNTRIES', payload: response.data});
    });
  });
}
