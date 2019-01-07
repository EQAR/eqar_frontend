import { composeResetReducer } from 'redux-reset-store';
import lodash from 'lodash';


const initialState = {
  formDisplay: false,
  isSelect: false,
  addNew: false,
  institution: {
    id: null,
    deqar_id: '',
    website_link: '',
    founding_date: '',
    closure_date: null,
    identifiers: [],
    names: [
      {
        id: null,
        name_official: '',
        name_official_transliterated: '',
        name_english: '',
        acronym: '',
        name_valid_to: '',
        alternative_names: [
          {
            id: null,
            name: '',
            transliteration: ''
          }
        ]
      }
    ],
    countries: [
      {
        id: null,
        country: null,
        city: '',
        lat: null,
        long: null,
        country_valid_from: '',
        country_valid_to: null
      }
    ],
    qf_ehea_levels: [
      {
        id: null,
        qf_ehea_level: null
      }
    ]
  }
}

const institutionFormReducer = composeResetReducer(function institutionFormReducer(state = lodash.cloneDeep(initialState), action) {
  switch (action.type) {
    case 'OPEN_INSTITUTION_FORM': {
      return {
        ...state,
        formDisplay: true,
        isSelect: action.payload.isSelect,
        addNew: action.payload.addNew
       }
    }
    case 'CLOSE_INSTITUTION_FORM': {
      return { 
        ...state,
        formDisplay: false
      }
    }
    case 'CHANGE_INSTITUTION_ALL': {
      return {
        ...state,
        institution: action.payload
      }
    }
    case 'CHANGE_NAMES': {
      return {
        ...state,
        institution: {
          ...state.institution,
          names: action.payload
        }
      }
    }
    case 'CHANGE_NAME_OFFICIAL': {
      return {
        ...state,
        institution: {
          ...state.institution,
          names: {
            ...state.institution.names,
            name_official: action.payload
          }
        }
      }
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
    case 'CHANGE_NAME_ENGLISH': {
      return {
        ...state,
        institution: {
          ...state.institution,
          names: {
            ...state.institution.names,
            name_english: action.payload
          }
        }
      }
    }
    case 'CHANGE_IDENTIFIER': {
      return {
        ...state,
        institution: {
          ...state.institution,
          identifiers: action.payload
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
