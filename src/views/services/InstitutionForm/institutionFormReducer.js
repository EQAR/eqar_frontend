import { composeResetReducer } from 'redux-reset-store';
import lodash from 'lodash';


const initialState = {
  formDisplay: false,
  isSelect: false,
  institution: {
    id: null,
    deqar_id: '',
    website_link: '',
    founding_date: '',
    closure_date: null,
    identifiers: [],
    names: [],
    countries: [],
    qf_ehea_levels: []
  },
  validName: {
    id: null,
    name_official: '',
    name_official_transliterated: '',
    name_english: '',
    acronym: '',
    name_valid_to: null,
    alternative_names: []
  }
}

const institutionFormReducer = composeResetReducer(function institutionFormReducer(state = lodash.cloneDeep(initialState), action) {
  switch (action.type) {
    case 'OPEN_INSTITUTION_FORM': {
      return { ...state, formDisplay: true, isSelect: action.payload }
    }
    case 'CLOSE_INSTITUTION_FORM': {
      return { ...state, formDisplay: false }
    }
    case 'CHANGE_INSTITUTION_ALL': {
      return {
        ...state,
        institution: action.payload,
        validName: action.validName
      }
    }
    case 'CHANGE_NAME_TRANSLITERATED': {
      return {
        ...state,
        validName: {
          ...state.validName,
          name_official_transliterated: action.payload
        }
      }
    }
    case 'CHANGE_NAME_ENGLISH': {
      return {
        ...state,
        validName: {
          ...state.validName,
          name_english: action.payload
        }
      }
    }
    case 'CHANGE_ACRONYM': {
      return {
        ...state,
        validName: {
          ...state.validName,
          acronym: action.payload
        }
      }
    }
    case 'CHANGE_INSTITUTION_ALTERNATIVE_NAME': {
      return {
        ...state,
        validName: {
          ...state.validName,
          alternative_names: action.payload
        }
      }
    }
    case 'CHANGE_NATIONAL_IDENTIFIER': {
      return {
        ...state,
        institution: {
          ...state.institution,
          identifiers: {
            ...state.institution.identifiers,
            national_identifier: action.payload
          }
        }
      }
    }
    case 'CHANGE_LOCAL_IDENTIFIER': {
      return {
        ...state,
        institution: {
          ...state.institution,
          identifiers: {
            ...state.institution.identifiers,
            local_identifier: action.payload
          }
        }
      }
    }
    case 'CHANGE_INSTITUITON_COUNTRY': {
      return {
        ...state,
        institution: {
          ...state.institution,
          countries: action.payload
        }
      }
    }
    case 'CHANGE_QF_EHEA_LEVELS': {
      return {
        ...state,
        institution: {
          ...state.institution,
          qf_ehea_levels: action.payload
        }
      }
    }
    default: return { ...state };
  }
}, initialState, 'RESET_INSTITUTION_FORM');

export default institutionFormReducer;
