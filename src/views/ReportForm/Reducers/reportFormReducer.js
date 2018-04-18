function reportFormReducer(state = {
  agency: '',
  local_identifier: '',
  activity: '',
  status: '',
  decision: '',
  valid_from: '',
  valid_to: '',
  report_links: [
    {
      link: '',
      link_display_name: ''
    }
  ],
  report_files: [],
  institutions: [],
  programmes: [],
  date_format: '%Y-%m-%d'
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
    case 'ADD_EMPTY_REPORTLINK': {
      return { ...state, report_links: action.payload }
    }
    case 'CHANGE_REPORTLINK': {
      return { ...state, report_links: action.payload }
    }
    case 'REMOVE_REPORTLINK': {
      return { ...state, report_links: action.payload }
    }
    case 'SELECT_INSTITUTION': {
      return { ...state, institutions: action.payload }
    }
    case 'REMOVE_INSTITUTION': {
      return { ...state, institutions: action.payload }
    }
    case 'ADD_PROGRAMME': {
      return { ...state, programmes: action.payload }
    }
    case 'ADD_FILE': {
      return { ...state, report_files: action.payload }
    }
    default: return { ...state };
  }
}

export default reportFormReducer;
