import { composeResetReducer } from 'redux-reset-store';
import lodash from 'lodash';


const initialState = {
  programme_index: null,
  name_primary: '',
  qualification_primary: '',
  alternative_names: [
    {
      name_alternative: '',
      qualification_alternative: ''
    }
  ],
  identifiers: [
    {
      identifier: '',
      resource: ''
    }
  ],
  qf_ehea_level: '',
  nqf_level: '',
  countries: []
}

const programmeReducer = composeResetReducer(function programmeReducer(state = lodash.cloneDeep(initialState), action) {
  switch (action.type) {
    case 'CHANGE_PROGRAMME_NAME': {
      return { ...state, name_primary: action.payload};
    }
    case 'CHANGE_QUALIFICATION': {
      return { ...state, qualification_primary: action.payload};
    }
    case 'ADD_EMPTY_ALTERNATIVE_NAME': {
      return { ...state, alternative_names: action.payload};
    }
    case 'CHANGE_ALTERNATIVE_NAME': {
      return { ...state, alternative_names: action.payload};
    }
    case 'REMOVE_ALTERNATIVE_NAME': {
      return { ...state, alternative_names: action.payload};
    }
    case 'ADD_EMPTY_IDENTIFIER': {
      return { ...state, identifiers: action.payload};
    }
    case 'CHANGE_IDENTIFIERS': {
      return { ...state, identifiers: action.payload};
    }
    case 'REMOVE_IDENTIFIER': {
      return { ...state, identifiers: action.payload};
    }
    case 'CHANGE_QFEHEA_LEVEL': {
      return { ...state, qf_ehea_level: action.payload};
    }
    case 'CHANGE_NQF_LEVEL': {
      return { ...state, nqf_level: action.payload};
    }
    case 'ADD_COUNTRY': {
      return { ...state, countries: action.payload};
    }
    case 'EDIT_PROGRAMME': {
      return {...state, ...action.payload, programme_index: action.programme_index}
    }
    default: return { ...state };
  }
}, initialState, 'RESET_PROGRAMME');

export default programmeReducer;
