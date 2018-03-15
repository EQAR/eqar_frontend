import { push } from 'redux-first-routing';
import axios from 'axios';
import store from '../../../main_store';
import eventActions from './eventActions';


export function formFill(inputValue, inputId) {
  store.dispatch((dispatch) => {
    dispatch({ type: eventActions(inputId), payload: inputValue });
  });
}
