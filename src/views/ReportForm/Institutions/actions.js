import axios from 'axios';
import store from '../../../main_store';


export function getInstitutions(input) {
  return axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions', {params: {query: input}})
  .then((response) => {
    return response.data.results.map(result => {
      return {
        value: result,
        label: result.name_primary
      }
    })
  })
  .then(results => {
    return ({ options: results })
  });
}

export function selectInstitution(institution, institutions=[]) {
  institutions.push(institution);
  store.dispatch({ type: 'SELECT_INSTITUTION', payload: institutions});
}

export function removeInstitution(institutionId, institutions=[]) {
  institutions.splice(institutionId, 1);
  store.dispatch({ type: 'REMOVE_INSTITUTION', payload: institutions});
}
