function programmeReducer(state = {
  programmeName: '',
  qualification: '',
  alternativeNames: []
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
    default: return { ...state };
  }
}

export default programmeReducer;
