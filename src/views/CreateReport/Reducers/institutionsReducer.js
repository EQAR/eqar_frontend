function institutionsReducer(state = {
  institutions: [null]
}, action) {
  switch (action.type) {
    case 'GET_INSTITUTIONS': {
      return { ...state, institutions: action.payload }
    }
    default: return { ...state };
  }
}

export default institutionsReducer;
