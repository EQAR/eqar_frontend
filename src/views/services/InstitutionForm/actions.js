import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTION } from '../../../config';


export function institutionRequest(id) {
  store.dispatch((dispatch) => {
    axios.get(`${GET_INSTITUTION}${id}/`)
      .then((response) => {
      dispatch({ type: 'GET_INSTITUTION_ALL', payload: response.data })
    })
  });
}

export function closeInstitutionForm() {
  store.dispatch({ type: 'CLOSE_INSTITUTION_FORM'})
}

export function openInstitutionForm() {
  store.dispatch({ type: 'OPEN_INSTITUTION_FORM'})
}
