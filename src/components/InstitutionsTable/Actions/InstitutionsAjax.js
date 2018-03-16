import axios from 'axios';
import store from '../../../main_store';


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
    offset: offset
  };
  InstitutionsRequest(params);
}

export function getInstitutionsByName(query='') {
  const params = {
    query: query.name_primary.value
  };
  InstitutionsRequest(params);
}
