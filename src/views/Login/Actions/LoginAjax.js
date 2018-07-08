import { push } from 'redux-first-routing';
import axios from 'axios';
import store from '../../../main_store';
import { GET_TOKEN } from '../../../config';


function loginUser(username, password) {
  store.dispatch((dispatch) => {
    axios.post(GET_TOKEN, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.state === "success") {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
        dispatch({ type: 'TOKEN_PROVIDED', payload: response.data, username: username })
        dispatch({ type: 'LOGIN_ALERT', payload: false })
      }
    }).then(() => {
      dispatch(push('/'));
    }).catch(function (error) {
      if (error.response.status === 401) {
        dispatch({ type: 'LOGIN_ALERT', payload: true  })
      }
    });
  });
}

export default loginUser;
