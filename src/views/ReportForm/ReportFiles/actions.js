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
  inputValue.report_language = inputValue.report_language.map(language => language.value)
  reportFiles.push(inputValue);
  store.dispatch({ type: 'ADD_FILE', payload: reportFiles });
}

export function addEditedFileToReport(editedValue, reportFiles=[]) {
  if (editedValue.report_language.value) {
    editedValue.report_language = editedValue.report_language.map(language => language.value)
  }
  reportFiles[editedValue.file_index] = editedValue;
  store.dispatch({ type: 'ADD_FILE', payload: reportFiles });
}

export function resetFile() {
  store.dispatch({ type: 'RESET_FILE'} );
}

export function editFile(id, files=[]) {
  const file = files[id]
  store.dispatch({ type: 'EDIT_FILE', payload: file, fileIndex: parseInt(id, 10)});
}

export function removeFile(index, files=[]) {
  files.splice(index, 1);
  store.dispatch({ type: 'REMOVE_FILES', payload: files });
}
