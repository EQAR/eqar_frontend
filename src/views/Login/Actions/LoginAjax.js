import { push } from 'react-router-redux';
import axios from 'axios';
import store from '../../../main_store';


function loginUser(username, password) {

  store.dispatch((dispatch) => {
    axios.post('https://backend.deqar.eu/accounts/get_token/', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(history);
      dispatch({ type: 'TOKEN_PROVIDED', payload: response.data, username: username });
      // if (response.data.state) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      //   dispatch({ type: 'TOKEN_PROVIDED', payload: localStorage.getItem('token'), username: username });
      history.pushState('/');
      dispatch(push('/'));
      // } else {
      //   dispatch({ type: 'ERROR', payload: response.data.error });
      // }
    });
  });
}

export default loginUser;
