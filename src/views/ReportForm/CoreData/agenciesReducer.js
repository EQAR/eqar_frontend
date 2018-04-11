function agenciesReducer(state = {
  agencies: [],
}, action) {
  switch (action.type) {
    case 'GET_AGENCIES': {
      return { ...state, agencies: action.payload};
    }
    default: return { ...state };
  }
}

export default agenciesReducer;
