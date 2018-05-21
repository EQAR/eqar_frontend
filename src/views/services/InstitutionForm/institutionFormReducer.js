import { composeResetReducer } from 'redux-reset-store';
import lodash from 'lodash';


const initialState = {
  formDisplay: false,
  institution: {
    id: null,
    deqar_id: '',
    website_link: '',
    founding_date: '',
    closure_date: null,
    identifiers: [],
    names: {
      id: null,
      name_official: '',
      name_official_transliterated: '',
      name_english: '',
      acronym: '',
      name_valid_to: null,
      alternative_names: []
    },
    countries: [],
    qf_ehea_levels: []
  }
}

const institutionFormReducer = composeResetReducer(function institutionFormReducer(state = lodash.cloneDeep(initialState), action) {
  switch (action.type) {
    case 'OPEN_INSTITUTION_FORM': {
      return { ...state, formDisplay: true }
    }
    case 'CLOSE_INSTITUTION_FORM': {
      return { ...state, formDisplay: false }
    }
    case 'GET_INSTITUTION_ALL': {
      return { ...state, institution: action.payload }
    }
    case 'CHANGE_NAME_TRANSLITERATED': {
      return {
              ...state,
              institution: {
                ...state.institution,
                names: {
                  ...state.institution.names,
                  name_official_transliterated: action.payload
                }
              }
            }
    }
    default: return { ...state };
  }
}, initialState, 'RESET_INSTITUTION_FORM');

export default institutionFormReducer;
