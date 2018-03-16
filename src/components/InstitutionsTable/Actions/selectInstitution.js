import store from '../../../main_store';


function selectInstitution(institution, institutions) {
  institution.countries = [{
    country: institution.countries
  }]
  institutions.push(institution);
  store.dispatch({ type: 'SELECT_INSTITUTION', payload: institutions})
}

export default selectInstitution
