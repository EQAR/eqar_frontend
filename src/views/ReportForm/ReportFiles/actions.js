import axios from 'axios';
import store from '../../../main_store';
import getType from './types.js';


export function fileForm(value, id) {
  store.dispatch({ type: getType(id), payload: value });
}
