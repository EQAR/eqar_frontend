import { push } from 'redux-first-routing';
import axios from 'axios';
import store from '../../../main_store';


function getReport(username, password) {

  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/reports_by_agency').then((response) => {
      console.log(response);
      // dispatch({ type: 'TOKEN_PROVIDED', payload: response.data, username: username });
      // if (response.data.state) {
      //   dispatch({ type: 'TOKEN_PROVIDED', payload: localStorage.getItem('token'), username: username });
      // history.push('/');
      // dispatch(push('/'));
      // } else {
      //   dispatch({ type: 'ERROR', payload: response.data.error });
      // }
    });
  });
}

export default getReport;
