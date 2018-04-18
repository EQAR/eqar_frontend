function decisionReducer(state = {
  decisions: []
}, action) {
  switch (action.type) {
    case 'GET_DECISIONS': {
      return { ...state, decisions: action.payload};
    }
    default: return { ...state };
  }
}

export default decisionReducer;
