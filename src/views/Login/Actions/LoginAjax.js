import { push } from 'redux-first-routing';
import axios from 'axios';
import store from '../../../main_store';


function loginUser(username, password) {

  store.dispatch((dispatch) => {
    axios.post('https://backend.deqar.eu/accounts/get_token/', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.state === "success") {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
        dispatch({ type: 'TOKEN_PROVIDED', payload: response.data, username: username })
      } else {
        console.log('Error');
      }
    }).then(() => {
      dispatch(push('/'));
    });
  });
}

export default loginUser;
