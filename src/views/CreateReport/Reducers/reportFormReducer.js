function reportFormReducer(state = {
  agency: '',
  local_identifier: '',
  activity: '',
  status: '',
  decision: '',
  valid_from: '',
  valid_to: '',
  report_links: [],
  institutions: [],
  programmes: [],
  report_files: []
}, action) {
  switch (action.type) {
    case 'CHANGE_LOCAL_IDENTIFIER': {
      return { ...state, local_identifier: action.payload }
    }
    case 'CHANGE_AGENCY_NAME': {
      return { ...state, agency: action.payload }
    }
    case 'CHANGE_AGENCY_ACTIVITY': {
      return { ...state, activity: action.payload }
    }
    case 'CHANGE_STATUS': {
      return { ...state, status: action.payload }
    }
    case 'CHANGE_DECISION': {
      return { ...state, decision: action.payload }
    }
    case 'CHANGE_VALID_FROM': {
      return { ...state, valid_from: action.payload }
    }
    case 'CHANGE_VALID_TO': {
      return { ...state, valid_to: action.payload }
    }
    case 'SELECT_INSTITUTION': {
      return { ...state, institutions: action.payload }
    }
    default: return { ...state };
  }
}

export default reportFormReducer;
