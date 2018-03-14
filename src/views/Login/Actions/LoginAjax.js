import { push } from 'redux-first-routing';
import axios from 'axios';
import store from '../../../main_store';


function loginUser(username, password) {

  store.dispatch((dispatch) => {
    axios.post('https://backend.deqar.eu/accounts/get_token/', {
      username: username,
      password: password,
    }).then((response) => {
      dispatch({ type: 'TOKEN_PROVIDED', payload: response.data, username: username });
      dispatch({ type: 'GET_AGENCY_NAME', payload: response.data.account });
      localStorage.setItem('token', response.data.token);
      dispatch(push('/'));
    });
  });
}

export default loginUser;
