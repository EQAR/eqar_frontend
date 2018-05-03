import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTIONS } from '../../../config';


function getInstitutions() {

  store.dispatch((dispatch) => {
    axios.get(GET_INSTITUTIONS).then((response) => {
      dispatch({ type: 'GET_INSTITUTION', payload: response.data.results});
    });
  });
}

export default getInstitutions;
