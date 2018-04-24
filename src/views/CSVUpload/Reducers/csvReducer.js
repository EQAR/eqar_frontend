import update from 'immutability-helper';

function csvReducer(state = {
    columns: [],
    data: [],
    errorObject: ""
}, action) {
  switch (action.type) {
    case 'SET_CSV_DATA': {
      let csvData = {
        columns: action.payload.columns,
        data: action.payload.data
      };
      return {
        ...state,
        ...csvData
      }
    }
    case 'UNSET_CSV_DATA': {
      return {
        ...state,
        columns: [],
        data: [],
        errorObject: ""
      }
    }
    case 'UPDATE_CSV_DATA': {
      return update(state,
        { data: {
          [action.payload.idx]: {$merge: {report_id: action.payload.report}}
        }
      });
    }
    case 'SET_CSV_RESULT_DISPLAY': {
      return {
        ...state,
        errorObject: action.payload.errorObject
      }
    }
    default: return { ...state };
  }
}

export default csvReducer;
