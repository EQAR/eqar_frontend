function reportReducer(state = {
  count: 0,
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
    default: return { ...state };
  }
}

export default reportReducer;
