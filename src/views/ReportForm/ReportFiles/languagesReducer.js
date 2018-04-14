const initialState = {
  languages: []
}

function languagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LANGUAGES': {
      return { ...state, languages: action.payload};
    }
    default: return { ...state };
  }
}

export default languagesReducer;
