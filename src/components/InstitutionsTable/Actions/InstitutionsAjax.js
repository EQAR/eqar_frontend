import axios from 'axios';
import store from '../../../main_store';


function getInstitutions(limit=null, offset=null) {
  const params = {
    limit: limit,
    offset: offset
  };

  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions', {params: params}).then((response) => {
      dispatch({ type: 'GET_INSTITUTIONS', payload: response.data.results});
    });
  });
}

export default getInstitutions;
