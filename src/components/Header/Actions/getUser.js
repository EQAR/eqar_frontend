import axios from 'axios';
import store from '../../../main_store';
import { GET_USER } from '../../../config';


function getUser() {

  store.dispatch((dispatch) => {
    axios.get(GET_USER).then((response) => {
      dispatch({ type: 'GET_USER', payload: response.data});
    });
  });
}

export default getUser;
