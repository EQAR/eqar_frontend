function reportReducer(state = {
  count: 0,
  agency: '',
  reports: [],
  next: '',
  previous: ''
}, action) {
  switch (action.type) {
    case 'GET_REPORTS': {
      return { ...state,
               count: action.payload.count,
               reports: action.payload.results,
               next: action.payload.next,
               previous: action.payload.previous
             };
    }
    case 'GET_AGENCY_NAME': {
      return { ...state,
               agency: action.payload
             };
    }
    default: return { ...state };
  }
}

export default reportReducer;
