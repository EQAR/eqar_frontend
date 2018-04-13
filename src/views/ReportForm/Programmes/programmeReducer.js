function programmeReducer(state = {
  programmeName: '',
  qualification: ''
}, action) {
  switch (action.type) {
    case 'CHANGE_PROGRAMME_NAME': {
      return { ...state, programmeName: action.payload};
    }
    case 'CHANGE_QUALIFICATION': {
      return { ...state, qualification: action.payload};
    }
    default: return { ...state };
  }
}

export default programmeReducer;
