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

export function selectInstitution(institution, institutions=[]) {
  institution.countries = [{
    country: institution.countries
  }]
  institutions.push(institution);
  store.dispatch({ type: 'SELECT_INSTITUTION', payload: institutions})
}

export function removeInstitution(institution, institutions=[]) {
  institutions.splice(institutions.indexOf(institution), 1);
  store.dispatch({ type: 'REMOVE_INSTITUTION', payload: institutions})
}
