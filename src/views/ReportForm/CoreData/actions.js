import axios from 'axios';
import store from '../../../main_store';


export function getAgencies() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/agency/').then((response) => {
      dispatch({ type: 'GET_AGENCIES', payload: response.data });
    });
  });
}

export function getActivities() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/agency_esg_activity/').then((response) => {
      dispatch({ type: 'GET_ACTIVITIES', payload: response.data});
    });
  });
}
