import { composeResetReducer } from 'redux-reset-store';

const initialState = {
  programmeName: '',
  qualification: '',
  alternativeNames: [],
  identifiers: [],
  qfeheaLevel: '',
  nqfLevel: '',
  countries: []
}

const programmeReducer = composeResetReducer(function programmeReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_PROGRAMME_NAME': {
      return { ...state, programmeName: action.payload};
    }
    case 'CHANGE_QUALIFICATION': {
      return { ...state, qualification: action.payload};
    }
    case 'ADD_EMPTY_ALTERNATIVE_NAME': {
      return { ...state, alternativeNames: action.payload};
    }
    case 'CHANGE_ALTERNATIVE_NAME': {
      return { ...state, alternativeNames: action.payload};
    }
    case 'REMOVE_ALTERNATIVE_NAME': {
      return { ...state, alternativeNames: action.payload};
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
      return { ...state, qfeheaLevel: action.payload};
    }
    case 'CHANGE_NQF_LEVEL': {
      return { ...state, nqfLevel: action.payload};
    }
    case 'ADD_COUNTRY': {
      return { ...state, countries: action.payload};
    }
    case 'EDIT_PROGRAMME': {
      state = action.payload
    }
    default: return { ...state };
  }
}, initialState, 'RESET_PROGRAMME');

export default programmeReducer;
