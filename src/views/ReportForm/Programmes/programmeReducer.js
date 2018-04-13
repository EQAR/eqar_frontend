function programmeReducer(state = {
  programme: [],
}, action) {
  switch (action.type) {
    case 'CHANGE_PROGRAMME': {
      return { ...state, programme: action.payload};
    }
    default: return { ...state };
  }
}

export default programmeReducer;
