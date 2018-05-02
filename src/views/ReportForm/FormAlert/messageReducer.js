import { composeResetReducer } from 'redux-reset-store';
import lodash from 'lodash';


const initialState = {
  messageDisplay: false,
  spinner: false,
  error: false,
  warning: false,
  errorMessage  : {
    report_links: [],
    programmes: []
  },
  warningMessages: []
}

const messageReducer = composeResetReducer(function messageReducer(state = lodash.cloneDeep(initialState), action) {
  switch (action.type) {
    case 'CHANGE_ERROR': {
      return {
        ...state,
        error: action.error,
        errorMessage: action.errorMessage
      };
    }
    case 'REMOVE_ERROR_MESSAGE': {
      return {
        ...state,
        errorMessage: action.payload
      };
    }
    case 'TOGGLE_ERROR': {
      return {
        ...state,
        messageDisplay: action.payload,
        error: action.payload
      };
    }
    case 'SPINNER_START': {
      return {
        ...state,
        messageDisplay: true,
        spinner: true
      };
    }
    case 'SPINNER_STOP': {
      return {
        ...state,
        spinner: false
      };
    }
    case 'UPLOAD_FINISH': {
      return {
        ...state,
        warning: true,
        warningMessages: action.payload
      }
    }
    default: return { ...state };
  }
}, initialState, 'RESET_MESSAGE');

export default messageReducer;
