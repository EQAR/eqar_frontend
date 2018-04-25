import { composeResetReducer } from 'redux-reset-store';
import lodash from 'lodash';

const initialState = {
  file_index: null,
  original_location: '',
  uploaded_file: [],
  report_language: [],
  display_name: ''
}

const fileReducer = composeResetReducer(function fileReducer(state = lodash.cloneDeep(initialState), action) {
  switch (action.type) {
    case 'CHANGE_FILE_URL': {
      return { ...state, original_location: action.payload};
    }
    case 'CHANGE_UPLOADED_FILE': {
      return { ...state, uploaded_file: action.payload};
    }
    case 'ADD_LANGUAGE': {
      return { ...state, report_language: action.payload};
    }
    case 'CHANGE_FILE_NAME': {
      return { ...state, display_name: action.payload};
    }
    case 'EDIT_FILE': {
      return { ...state, ...action.payload, file_index: action.fileIndex};
    }
    default: return { ...state };
  }
}, initialState, 'RESET_FILE');

export default fileReducer;
