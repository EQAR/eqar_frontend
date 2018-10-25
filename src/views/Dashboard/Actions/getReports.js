import axios from 'axios';
import store from '../../../main_store';
import { GET_REPORTS } from '../../../config';


function getReports(limit=null, offset=null) {
  const params = {
    limit: limit,
    offset: offset
  };

  store.dispatch((dispatch) => {
    axios.get(GET_REPORTS, {params: params})
      .then((response) => {
        dispatch({ type: 'RESET_MESSAGE' });
        dispatch({ type: 'GET_REPORTS', payload: response.data});
      })
      .catch((error) => {
        dispatch({ type: 'RESET_MESSAGE' });
      });
  });
}

export default getReports;
