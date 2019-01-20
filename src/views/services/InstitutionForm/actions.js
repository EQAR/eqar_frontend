import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTION } from '../../../config';
import getType from './types.js';
import _ from 'lodash';


export function institutionRequest(id) {
  store.dispatch((dispatch) => {
    axios.get(`${GET_INSTITUTION}${id}/`)
      .then((response) => {
        response.data.countries = response.data.countries.map(country => {
          if (country.lat === 0) {
            country.lat = null;
          }
          if (country.long === 0) {
            country.long = null;
          }
          return country;
        })
        dispatch({ type: 'CHANGE_INSTITUTION_ALL', payload: response.data });
    })
  });
}

export function putInstitution(institution) {
  store.dispatch({type: 'SPINNER_START'});
  return axios.put(`${GET_INSTITUTION}${institution.id}/`, institution)
    .then(response => {
      store.dispatch({type: 'SPINNER_STOP'});
      store.dispatch({type: 'UPLOAD_FINISH', payload: ''});
      return response;
    })
    .catch(error => {
      store.dispatch({type: 'SPINNER_STOP'});
      error.response.data.errors ?
        store.dispatch({type: 'CHANGE_ERROR', error: true, errorMessage: error.response.data.errors }) :
        store.dispatch({type: 'CHANGE_ERROR', error: true, errorMessage: {other: [{error: ['There was an error posting the institution']}]} })
    })
}

export function saveToForm(value, id) {
  store.dispatch({ type: getType(id), payload: value });
}

export function changeCountry(value, index, countries) {
  countries[index].country = value.value;
  store.dispatch({ type: 'CHANGE_INSTITUITON_COUNTRY', payload: countries });
}

export function changeCountryData(value, id, index, countries) {
  countries[index][id] = value;
  store.dispatch({ type: 'CHANGE_INSTITUITON_COUNTRY', payload: countries });
}

export function changeIdentifier(value, id, identifiers) {
  if (_.filter(identifiers, item => item.resource === id.replace('_', ' ')).length === 0) {
    identifiers.push({identifier: value, resource: id.replace('_', ' ')});
  } else if (id === 'national_identifier') {
    _.find(identifiers, i => i.resource === 'national identifier').identifier = value
  } else {
    _.find(identifiers, i => i.resource === 'local identifier').identifier = value
  }
  store.dispatch({ type: 'CHANGE_IDENTIFIER', payload: identifiers });
}

export function changeQFEHEALEVELS(values) {
  values = values.map(value => {
    return { qf_ehea_level: value.value};
  });
  store.dispatch({ type: 'CHANGE_QF_EHEA_LEVELS', payload: values });
}

export function addName(inputValue, inputId, institutionNames) {
  institutionNames[0][inputId] = inputValue;
  store.dispatch({ type: 'CHANGE_NAMES', payload: institutionNames });
}

export function addEmptyAlternativeName(institutionNames) {
  institutionNames[0].alternative_names.push({name: '', transliteration: ''});
  store.dispatch({ type: 'CHANGE_NAMES', payload: institutionNames });
}

export function addAlternativeName(inputValue, inputId, indexOfAlter, institutionNames) {
  institutionNames[0].alternative_names[indexOfAlter][inputId] = inputValue
  store.dispatch({ type: 'CHANGE_NAMES', payload: institutionNames });
}

export function removeAlterName(index, institutionNames) {  
  institutionNames[0].alternative_names.splice(index, 1);
  store.dispatch({ type: 'CHANGE_NAMES', payload: institutionNames });
}

export function resetFields() {
  store.dispatch({ type: 'RESET_INSTITUTION_FORM'});
}

export function closeInstitutionForm() {
  store.dispatch({ type: 'CLOSE_INSTITUTION_FORM'})
}

export function openInstitutionForm(options) {
  store.dispatch({ type: 'OPEN_INSTITUTION_FORM', payload: options})
}
