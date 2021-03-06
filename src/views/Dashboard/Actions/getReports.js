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
        dispatch({ type: 'GET_REPORTS', payload: response.data});
      });
  });
}

export default getReports;
