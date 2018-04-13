import axios from 'axios';
import store from '../../../main_store';


export function getInstitutions(filterValue=null) {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions', {params: {query:filterValue}}).then((response) => {
      dispatch({ type: 'GET_INSTITUTIONS', payload: response.data});
    });
  });
}

export function selectInstitution(institution) {
  store.dispatch({ type: 'GET_INSTITUTION', payload: institution});
}