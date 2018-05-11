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
  institutions = institutions.filter(i => i.deqar_id !== institution.deqar_id)
  store.dispatch({ type: 'REMOVE_INSTITUTION', payload: institutions})
}

export function openInstitutionForm() {
  store.dispatch({ type: 'OPEN_INSTITUTION_FORM'})
}

export function changeInstitutionId(institution) {
  store.dispatch({ type: 'CHANGE_INSTITUTION_ID', payload: institution.id})
}
