import { composeResetReducer } from 'redux-reset-store';

const initialState = {
  original_location: '',
  // uploadedFile: '',
  report_language: [],
  display_name: ''
}

const fileReducer = composeResetReducer(function fileReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_FILE_URL': {
      return { ...state, original_location: action.payload};
    }
    case 'CHANGE_UPLOADED_FILE': {
      return { ...state, uploadedFile: action.payload};
    }
    case 'ADD_LANGUAGE': {
      return { ...state, report_language: action.payload};
    }
    case 'CHANGE_FILE_NAME': {
      return { ...state, display_name: action.payload};
    }
    default: return { ...state };
  }
}, initialState, 'RESET_FILE');

export default fileReducer;
