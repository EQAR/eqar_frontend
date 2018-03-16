import store from '../../../main_store';


export function selectInstitution(institution, institutions) {
  console.log(institutions);
  institutions.push(institution);
  store.dispatch({ type: 'SELECT_INSTITUTION', payload: institutions})
}
