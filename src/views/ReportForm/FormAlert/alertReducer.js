function alertReducer(state = {
  alertDisplay: false,
  errorMessage: {
    report_links: [],
    programmes: []
  }
}, action) {
  switch (action.type) {
    case 'CHANGE_ALERT': {
      return {
        ...state,
        alertDisplay: action.alertDisplay,
        errorMessage: action.errorMessage
      };
    }
    case 'TOGGLE_ALERT': {
      return {
        ...state,
        alertDisplay: action.payload
      };
    }
    default: return { ...state };
  }
}

export default alertReducer;
