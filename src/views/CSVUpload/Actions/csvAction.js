import store from '../../../main_store';

export function csvSet(columns, data) {
  store.dispatch((dispatch) => {
    dispatch({ type: 'SET_CSV_DATA', payload: {columns: columns, data: data}})
  });
}

export function csvUnset() {
  store.dispatch((dispatch) => {
    dispatch({ type: 'UNSET_CSV_DATA', payload: {columns: [], data: []}})
  });
}

export function csvUpdate(idx, report) {
  store.dispatch((dispatch) => {
    dispatch({ type: 'UPDATE_CSV_DATA', payload: {idx: idx, report: report}})
  })
}

export function csvResultDisplay(errorObject) {
  store.dispatch((dispatch) => {
    dispatch({ type: 'SET_CSV_RESULT_DISPLAY', payload: {errorObject: errorObject}})
  });
}