import { push } from 'react-router-redux';
import axios from 'axios';
import store from '../../../main_store';


function loginUser(name, password) {
  store.dispatch((dispatch) => {
    axios().post('https://backend.deqar.eu/accounts/get_token/', {
      username: name,
      password,
    }).then((response) => {
      dispatch({ type: 'FETCHING_USERS', payload: response.data });
      if (response.data.state) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', name);
        dispatch({ type: 'TOKEN_PROVIDED', payload: localStorage.getItem('token'), username: name });
        dispatch(push('/dashboard'));
      } else {
        dispatch({ type: 'ERROR', payload: response.data.error });
      }
    });
  });
}

export default loginUser;
