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
  console.log(institution);
  store.dispatch((dispatch) => {
    dispatch({type: 'SPINNER_START'});
    axios.put(`${GET_INSTITUTION}${institution.id}/`, institution)
      .then(response => {
        console.log(response, response.data);
        dispatch({type: 'SPINNER_STOP'});
        dispatch({type: 'UPLOAD_FINISH', payload: ''});
      })
      .catch(error => {
        dispatch({type: 'SPINNER_STOP'});
        dispatch({type: 'RESET_MESSAGE'});
        console.log(error.response);
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

export function openInstitutionForm() {
  store.dispatch({ type: 'OPEN_INSTITUTION_FORM'})
}
