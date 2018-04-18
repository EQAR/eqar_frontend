function statusReducer(state = {
  statuses: []
}, action) {
  switch (action.type) {
    case 'GET_STATUSES': {
      return { ...state, statuses: action.payload};
    }
    default: return { ...state };
  }
}

export default statusReducer;
