function institutionsReducer(state = {
  institutions: [],
}, action) {
  switch (action.type) {
    case 'GET_INSTITUTIONS': {
      return { ...state, institutions: action.payload.results }
    }
    default: return { ...state };
  }
}

export default institutionsReducer;
