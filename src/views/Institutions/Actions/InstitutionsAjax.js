import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTIONS } from '../../../config';

export function InstitutionsRequest(params) {
  store.dispatch((dispatch) => {
    axios.get(GET_INSTITUTIONS, { params: params })
      .then((response) => {
      dispatch({ type: 'GET_INSTITUTION_REFERENCES', payload: {data: response.data, params: params}})
    })
  });
}
