import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTION } from '../../../config';
import getType from './types.js';
import _ from 'lodash';


export function institutionRequest(id) {
  store.dispatch((dispatch) => {
    axios.get(`${GET_INSTITUTION}${id}/`)
      .then((response) => {
        response.data.names = _.find(response.data.names, (name => name.name_valid_to === null))
        dispatch({ type: 'GET_INSTITUTION_ALL', payload: response.data })
    })
  });
}

export function saveToForm(value, id, institutionForm) {
  store.dispatch({ type: getType(id), payload: value });
}

export function closeInstitutionForm() {
  store.dispatch({ type: 'CLOSE_INSTITUTION_FORM'})
}

export function openInstitutionForm() {
  store.dispatch({ type: 'OPEN_INSTITUTION_FORM'})
}
