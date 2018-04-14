import { composeResetReducer } from 'redux-reset-store';

const initialState = {
  url: '',
  uploadedFile: '',
  languages: [],
  name: ''
}

const fileReducer = composeResetReducer(function fileReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_FILE_URL': {
      return { ...state, url: action.payload};
    }
    case 'CHANGE_UPLOADED_FILE': {
      return { ...state, uploadedFile: action.payload};
    }
    case 'ADD_LANGUAGE': {
      return { ...state, languages: action.payload};
    }
    default: return { ...state };
  }
}, initialState, 'RESET_FILE');

export default fileReducer;
