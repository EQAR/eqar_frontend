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
        console.log(response.data.state);
        dispatch({ type: 'TOKEN_PROVIDED', payload: response.data, username: username });
        localStorage.setItem('token', response.data.token);
        dispatch(push('/'));
      } else {
        console.log('Error');
      }
    });
  });
}

export default loginUser;
