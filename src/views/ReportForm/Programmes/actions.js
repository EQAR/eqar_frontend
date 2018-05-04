import axios from 'axios';
import store from '../../../main_store';
import {GET_QFEHEA_LEVELS} from '../../../config';
import getType from './types.js';


export function programmeForm(value, id) {
  store.dispatch({ type: getType(id), payload: value });
}

export function addEmptyAlterName(alternativeNames=[]) {
  alternativeNames.push({name_alternative: '', qualification_alternative: ''});
  store.dispatch({ type: 'ADD_EMPTY_ALTERNATIVE_NAME', payload: alternativeNames });
}

export function addFirstAlterName(inputValue, inputId, indexOfAlter, alternativeNames=[]) {
  if (!alternativeNames[0].name_alternative) {
    alternativeNames.push({name_alternative: '', qualification_alternative: ''});
    store.dispatch({ type: 'ADD_EMPTY_ALTERNATIVE_NAME', payload: alternativeNames });
  }
  alternativeNames[indexOfAlter][inputId] = inputValue;
  store.dispatch({ type: 'CHANGE_ALTERNATIVE_NAME', payload: alternativeNames });
}

export function addAlterName(inputValue, inputId, indexOfAlter, alternativeNames=[]) {
  alternativeNames[indexOfAlter][inputId] = inputValue
  store.dispatch({ type: 'CHANGE_ALTERNATIVE_NAME', payload: alternativeNames });
}

export function removeName(index, alternativeNames=[]) {
  alternativeNames.splice(index, 1);
  store.dispatch({ type: 'REMOVE_ALTERNATIVE_NAME', payload: alternativeNames });
}

export function addEmptyIdentifier(identifiers=[]) {
  identifiers.push({identifier: '', resource: ''});
  store.dispatch({ type: 'ADD_EMPTY_IDENTIFIER', payload: identifiers });
}

export function addIdentifier(inputValue, inputId, indexOfAlter, identifiers=[]) {
  identifiers[indexOfAlter][inputId] = inputValue
  store.dispatch({ type: 'CHANGE_IDENTIFIERS', payload: identifiers });
}

export function removeIdentifier(index, identifiers=[]) {
  identifiers.splice(index, 1);
  store.dispatch({ type: 'REMOVE_IDENTIFIER', payload: identifiers });
}

export function getQFEHEA() {
  store.dispatch((dispatch) => {
    axios.get(GET_QFEHEA_LEVELS).then((response) => {
      dispatch({ type: 'GET_QFEHEA_LEVELS', payload: response.data});
    });
  });
}

export function addCountry(countries) {
  store.dispatch({ type: 'ADD_COUNTRY', payload: countries });
}

export function addProgrammeToReport(inputValue, programmes=[]) {
  programmes.push(inputValue);
  store.dispatch({ type: 'ADD_PROGRAMME', payload: programmes });
}

export function addEditedProgrammeToReport(editedValue, programmes=[]) {
  programmes[editedValue.programme_index] = editedValue;
  store.dispatch({ type: 'ADD_PROGRAMME', payload: programmes });
}

export function resetProgramme() {
  store.dispatch({ type: 'RESET_PROGRAMME'});
}

export function editProgramme(id, programmes=[]) {
  const programme = programmes[id]
  store.dispatch({ type: 'EDIT_PROGRAMME', payload: programme, programme_index: parseInt(id, 10)});
}

export function removeProgramme(index, programmes=[]) {
  programmes.splice(index, 1);
  store.dispatch({ type: 'REMOVE_PROGRAMME', payload: programmes });
}
