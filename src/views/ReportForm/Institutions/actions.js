import axios from 'axios';
import store from '../../../main_store';
import { GET_INSTITUTIONS } from '../../../config';



export function getInstitutions(input, reportInstitutions) {
  const reportInstitutionsIds = reportInstitutions.map(institution => institution.id);
  return axios.get(GET_INSTITUTIONS, {params: {query: input}})
  .then((response) => {
    return response.data.results.filter(result => !reportInstitutionsIds.includes(result)).map(result => {
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

export function selectInstitution(institutionInput, institutions=[]) {
  institutions.push(institutionInput);
  store.dispatch({ type: 'SELECT_INSTITUTION', payload: institutions});
}

export function removeInstitution(institutionId, institutions=[]) {
  institutions.splice(institutionId, 1);
  store.dispatch({ type: 'REMOVE_INSTITUTION', payload: institutions});
}
