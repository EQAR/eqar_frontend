import axios from 'axios';
import store from '../../../main_store';
import getType from './types.js';


export function programmeForm(value, id) {
  store.dispatch({ type: getType(id), payload: value });
}

export function addEmptyAlterName(alternativeNames=[]) {
  alternativeNames.push({alternativeName: '', alternativeQualification: ''});
  store.dispatch({ type: 'ADD_EMPTY_ALTERNATIVE_NAME', payload: alternativeNames });
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
  identifiers.push({identifier: '', source: ''});
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