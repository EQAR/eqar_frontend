function programmeReducer(state = {
  programmeName: '',
  qualification: '',
  alternativeNames: [],
  identifiers: [],
  qfeheaLevel: ''
}, action) {
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
    default: return { ...state };
  }
}

export default programmeReducer;
