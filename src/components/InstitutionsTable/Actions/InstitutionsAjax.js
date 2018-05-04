import axios from 'axios';
import store from '../../../main_store';
import GET_INSTITUTIONS from '../../../config';

let query = '';
let country = null;

function InstitutionsRequest(params) {
  store.dispatch((dispatch) => {
    axios.get(GET_INSTITUTIONS, {params: params}).then((response) => {
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
