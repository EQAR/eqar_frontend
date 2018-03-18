import store from '../../../main_store';


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
