import axios from 'axios';
import store from '../../../main_store';

let query = '';

function InstitutionsRequest(params) {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions', {params: params}).then((response) => {
      dispatch({ type: 'GET_INSTITUTIONS', payload: response.data});
    });
  });
}

export function getInstitutionsByOffset(limit=null, offset=null) {
  const params = {
    limit: limit,
    offset: offset,
    query: query
  };
  InstitutionsRequest(params);
}

export function getInstitutionsByName(q='') {
  query = q.name_primary.value
  const params = {
    query: query
  };
  InstitutionsRequest(params);
}
