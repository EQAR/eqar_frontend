import store from '../../../main_store';


export function selectInstitution(institution, institutions) {
  institutions.push(institution);
  store.dispatch({ type: 'SELECT_INSTITUTION', payload: institutions})
}