import { push } from 'redux-first-routing';
import axios from 'axios';
import store from './main_store';


function testUserToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    store.dispatch(push('/login'));
  } else {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }
  return token;
}

export default testUserToken;
