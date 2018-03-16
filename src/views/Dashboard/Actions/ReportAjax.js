import axios from 'axios';
import store from '../../../main_store';


function getReport(limit=null, offset=null) {
  const params = {
    limit: limit,
    offset: offset
  };

  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/reports_by_agency', {params: params})
      .then((response) => {
        dispatch({ type: 'GET_REPORTS', payload: response.data});
      });
  });
}

export default getReport;
