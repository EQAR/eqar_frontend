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
  // inputId === 'urlToReport' ? reportLinks[indexOfLink].url = inputValue : reportLinks[indexOfLink].text = inputValue;
  alternativeNames[indexOfAlter][inputId] = inputValue
  store.dispatch({ type: 'CHANGE_ALTERNATIVE_NAME', payload: alternativeNames });
}
