function qfeheaReducer(state = {
  levels: []
}, action) {
  switch (action.type) {
    case 'GET_QFEHEA_LEVELS': {
      return { ...state, levels: action.payload};
    }
    default: return { ...state };
  }
}

export default qfeheaReducer;
