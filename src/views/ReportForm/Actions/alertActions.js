import axios from 'axios';
import store from '../../../main_store';
import { push } from 'redux-first-routing';


export function toggleAlert() {
  store.dispatch({ type: 'TOGGLE_ERROR', payload: false});
}

export function resetMessage() {
  store.dispatch({ type: 'RESET_MESSAGE' });
}

export function closeReportForm() {
  store.dispatch({type: 'RESET_REPORT_FORM'});
  store.dispatch(push('/'));
}
