function institutionsReferencesReducer(state = {
  institutions: [],
  totalDataSize: 0,
  settings: {}
}, action) {
  switch (action.type) {
    case 'GET_INSTITUTION_REFERENCES': {
      return { ...state,
        institutions: action.payload.data.results,
        totalDataSize: action.payload.data.count,
        settings: action.payload.params,
      }
    }
    default: return { ...state };
  }
}

export default institutionsReferencesReducer;
