import axios from 'axios';
import store from '../../../main_store';


export function getInstitutions(filterValue=null) {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions', {params: {query:filterValue}}).then((response) => {
      dispatch({ type: 'GET_INSTITUTIONS', payload: response.data});
    });
  });
}

export function selectInstitution(institution, institutions=[]) {
  institutions.push(institution);
  store.dispatch({ type: 'SELECT_INSTITUTION', payload: institutions});
}

export function removeInstitution(institutionId, institutions=[]) {
  institutions.splice(institutionId, 1);
  store.dispatch({ type: 'REMOVE_INSTITUTION', payload: institutions});
}
