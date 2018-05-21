import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTION } from '../../../config';
import getType from './types.js';
import _ from 'lodash';


export function institutionRequest(id) {
  store.dispatch((dispatch) => {
    axios.get(`${GET_INSTITUTION}${id}/`)
      .then((response) => {
        response.data.names = _.find(response.data.names, (name => name.name_valid_to === null));
        response.data.countries = response.data.countries.map(country => {
          if (country.lat === 0) {
            country.lat = null;
          }
          if (country.long === 0) {
            country.long = null;
          }
          return country;
        })
        dispatch({ type: 'GET_INSTITUTION_ALL', payload: response.data });
    })
  });
}

export function saveToForm(value, id) {
  store.dispatch({ type: getType(id), payload: value });
}

export function changeCountryData(value, id, index, countries) {
  countries[index][id] = value;
  store.dispatch({ type: 'CHANGE_INSTITUITON_COUNTRY', payload: countries });
}

export function closeInstitutionForm() {
  store.dispatch({ type: 'CLOSE_INSTITUTION_FORM'})
}

export function openInstitutionForm() {
  store.dispatch({ type: 'OPEN_INSTITUTION_FORM'})
}
