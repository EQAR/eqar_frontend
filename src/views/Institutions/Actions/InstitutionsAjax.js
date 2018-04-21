import axios from 'axios';
import store from '../../../main_store';

export function InstitutionsRequest(params) {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions/', { params: params })
      .then((response) => {
      dispatch({ type: 'GET_INSTITUTION_REFERENCES', payload: {data: response.data, params: params}})
    })
  });
}