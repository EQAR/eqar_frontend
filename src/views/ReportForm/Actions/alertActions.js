import axios from 'axios';
import store from '../../../main_store';


export function toggleAlert() {
  store.dispatch({ type: 'TOGGLE_ALERT', payload: false });
}
