import axios from 'axios';
import store from '../../../main_store';

function getBadges() {

  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/dashboard/badges').then((response) => {
      dispatch({ type: 'GET_BADGES', payload: response.data});
    });
  });
}

export default getBadges;
