import axios from 'axios';
import store from '../../../main_store';

let query = '';
let country = null;

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
    query: query,
    country: country
  };
  InstitutionsRequest(params);
}

export function getInstitutionsByName(param={}) {
  if (param.name_primary) {
    query = param.name_primary.value;
  } else {
    query = '';
  }
  if (param.countries){
    country = param.countries.value;
  } else {
    country = null
  }
  const params = {
    query: query,
    country: country
  };
  InstitutionsRequest(params);
}
