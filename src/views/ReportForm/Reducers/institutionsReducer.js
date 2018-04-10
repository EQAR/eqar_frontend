function institutionsReducer(state = {
  institutions: [],
  count: null
}, action) {
  switch (action.type) {
    case 'GET_INSTITUTIONS': {
      return { ...state, institutions: action.payload.results, count: action.payload.count }
    }
    default: return { ...state };
  }
}

export default institutionsReducer;
