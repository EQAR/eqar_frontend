import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTION } from '../../../config';
import getType from './types.js';
import _ from 'lodash';


export function institutionRequest(id) {
  store.dispatch((dispatch) => {
    axios.get(`${GET_INSTITUTION}${id}/`)
      .then((response) => {
        const validName = _.find(response.data.names, (name => name.name_valid_to === null));
        _.remove(response.data.names, (name => name.name_valid_to === null));
        response.data.countries = response.data.countries.map(country => {
          if (country.lat === 0) {
            country.lat = null;
          }
          if (country.long === 0) {
            country.long = null;
          }
          return country;
        })
        dispatch({ type: 'CHANGE_INSTITUTION_ALL', payload: response.data, validName: validName });
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
      console.log(error);
      console.log(error.response);
      
      error.response.data.errors ?
        store.dispatch({type: 'CHANGE_ERROR', error: true, errorMessage: error.response.data.errors }) :
        store.dispatch({type: 'CHANGE_ERROR', error: true, errorMessage: {other: [{error: ['There was an error posting the institution']}]} })
      return error;
    })
}

export function saveToForm(value, id) {
  store.dispatch({ type: getType(id), payload: value });
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

export function addEmptyAlternativeName(alternativeNames) {
  alternativeNames.push({name: '', transliteration: ''});
  store.dispatch({ type: 'CHANGE_INSTITUTION_ALTERNATIVE_NAME', payload: alternativeNames });
}

export function addAlternativeName(inputValue, inputId, indexOfAlter, alternativeNames) {
  alternativeNames[indexOfAlter][inputId] = inputValue
  store.dispatch({ type: 'CHANGE_INSTITUTION_ALTERNATIVE_NAME', payload: alternativeNames });
}

export function removeAlterName(index, alternativeNames) {
  alternativeNames.splice(index, 1);
  store.dispatch({ type: 'CHANGE_INSTITUTION_ALTERNATIVE_NAME', payload: alternativeNames });
}

export function resetFields() {
  store.dispatch({ type: 'RESET_INSTITUTION_FORM',});
}

export function closeInstitutionForm() {
  store.dispatch({ type: 'CLOSE_INSTITUTION_FORM'})
}

export function openInstitutionForm(options) {
  store.dispatch({ type: 'OPEN_INSTITUTION_FORM', payload: options})
}
