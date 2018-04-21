function csvReducer(state = {
    columns: [],
    data: []
}, action) {
  switch (action.type) {
    case 'SET_CSV_DATA': {
      let csvData = {
        columns: action.payload.columns,
        data: action.payload.data
      };
      return { ...state,
        ...csvData
      }
    }
    case 'UNSET_CSV_DATA': {
      return { ...state,
        columns: [],
        data: []
      }
    }
    default: return { ...state };
  }
}

export default csvReducer;
