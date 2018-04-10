import axios from 'axios';
import store from '../../../main_store';
import eventActions from './eventActions';


export function formFill(inputValue, inputId) {
  store.dispatch({ type: eventActions(inputId), payload: inputValue });
}

export function addProgrammeToReport(inputValue, inputId, programmes=[]) {
  programmes.push(inputValue);
  store.dispatch({ type: eventActions(inputId), payload: programmes });
}
