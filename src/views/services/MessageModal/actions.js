import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';


export function toggleAlert() {
  store.dispatch({ type: 'TOGGLE_ERROR', payload: false});
}

export function resetMessage() {
  store.dispatch({ type: 'RESET_MESSAGE' });
}

export function removeLinkErrorMessage(index, errorMessage=[]) {
  errorMessage.report_links.splice(index,1);
  store.dispatch({ type: 'REMOVE_ERROR_MESSAGE', payload: errorMessage });
}

export function closeReportForm() {
  store.dispatch({type: 'RESET_REPORT_FORM'});
  store.dispatch(push('/'));
}
