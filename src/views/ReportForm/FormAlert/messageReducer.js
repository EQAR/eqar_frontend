function messageReducer(state = {
  messageDisplay: false,
  spinner: false,
  errorMessage: {
    report_links: [],
    programmes: []
  }
}, action) {
  switch (action.type) {
    case 'CHANGE_ALERT': {
      return {
        ...state,
        messageDisplay: action.alertDisplay,
        errorMessage: action.errorMessage
      };
    }
    case 'TOGGLE_ALERT': {
      return {
        ...state,
        messageDisplay: action.payload
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
        messageDisplay: false,
        spinner: false
      };
    }
    default: return { ...state };
  }
}

export default messageReducer;
