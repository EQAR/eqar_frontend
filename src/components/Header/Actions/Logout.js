import { push } from 'redux-first-routing';
import store from '../../../main_store';

function logoutUser() {
  localStorage.removeItem('token');
  store.dispatch(push('/login'));
}

export default logoutUser;
