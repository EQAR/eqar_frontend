import axios from 'axios';
import store from '../../../main_store';
import getType from './types.js';


export function fileForm(value, id) {
  store.dispatch({ type: getType(id), payload: value });
}

export function languagesAjax() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/language').then((response) => {
      dispatch({ type: 'GET_LANGUAGES', payload: response.data});
    });
  });
}

export function addLanguage(language) {
  store.dispatch({ type: 'ADD_LANGUAGE', payload: language });
}

export function addFileToReport(inputValue, reportFiles=[]) {
  reportFiles.push(inputValue);
  store.dispatch({ type: 'ADD_FILE', payload: reportFiles });
}

export function resetFile() {
  store.dispatch({ type: 'RESET_FILE'});
}
