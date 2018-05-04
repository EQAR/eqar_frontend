import axios from 'axios';
import store from '../../../main_store';
import { GET_AGENCIES, GET_STATUSES, GET_DECISIONS, GET_AGENCY, GET_ACTIVITIES } from '../../../config';



export function getAgencies() {
  store.dispatch((dispatch) => {
    axios.get(GET_AGENCIES).then((response) => {
      dispatch({ type: 'GET_AGENCIES', payload: response.data });
    });
  });
}

export function getStatuses() {
  store.dispatch((dispatch) => {
    axios.get(GET_STATUSES).then((response) => {
      dispatch({ type: 'GET_STATUSES', payload: response.data });
    });
  });
}

export function getDecisions() {
  store.dispatch((dispatch) => {
    axios.get(GET_DECISIONS).then((response) => {
      dispatch({ type: 'GET_DECISIONS', payload: response.data });
    });
  });
}

export function getAgency(agencyId) {
  store.dispatch((dispatch) => {
    axios.get(GET_AGENCY + agencyId + '/').then((response) => {
      dispatch({ type: 'GET_AGENCY', payload: response.data });
    });
  });
}

export function getActivities() {
  store.dispatch((dispatch) => {
    axios.get(GET_ACTIVITIES).then((response) => {
      dispatch({ type: 'GET_ACTIVITIES', payload: response.data});
    });
  });
}
