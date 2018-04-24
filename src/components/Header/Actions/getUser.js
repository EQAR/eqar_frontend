import axios from 'axios';
import store from '../../../main_store';

function getUser() {

  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/auth/me/').then((response) => {
      dispatch({ type: 'GET_USER', payload: response.data});
    });
  });
}

export default getUser;
