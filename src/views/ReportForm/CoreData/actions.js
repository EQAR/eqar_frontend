import axios from 'axios';
import store from '../../../main_store';


export function getAgencies() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/agency/').then((response) => {
      dispatch({ type: 'GET_AGENCIES', payload: response.data });
    });
  });
}

export function getStatuses() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/report_status/').then((response) => {
      dispatch({ type: 'GET_STATUSES', payload: response.data });
    });
  });
}

export function getDecisions() {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/adminapi/v1/select/report_decision/').then((response) => {
      dispatch({ type: 'GET_DECISIONS', payload: response.data });
    });
  });
}

export function getAgency(agencyId) {
  store.dispatch((dispatch) => {
    axios.get('https://backend.deqar.eu/webapi/v1/browse/agencies/' + agencyId).then((response) => {
      dispatch({ type: 'GET_AGENCY', payload: response.data });
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
