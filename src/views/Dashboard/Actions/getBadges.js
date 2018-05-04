import axios from 'axios';
import store from '../../../main_store';
import { GET_BADGES } from '../../../config'

function getBadges() {

  store.dispatch((dispatch) => {
    axios.get(GET_BADGES).then((response) => {
      dispatch({ type: 'GET_BADGES', payload: response.data});
    });
  });
}

export default getBadges;
