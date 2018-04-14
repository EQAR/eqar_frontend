import { composeResetReducer } from 'redux-reset-store';

const initialState = {
  url: '',
  uploadedFile: '',
  language: '',
  name: ''
}

const fileReducer = composeResetReducer(function fileReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_FILE_URL': {
      return { ...state, url: action.payload};
    }
    default: return { ...state };
  }
}, initialState, 'RESET_FILE');

export default fileReducer;
