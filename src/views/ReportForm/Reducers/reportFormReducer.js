function reportFormReducer(state = {
  agency: '',
  localIdentifier: '',
  activity: '',
  status: '',
  decision: '',
  validFrom: '',
  validTo: '',
  reportLinks: [],
  institutions: [],
  programmes: [],
  reportFiles: []
}, action) {
  switch (action.type) {
    case 'CHANGE_LOCAL_IDENTIFIER': {
      return { ...state, localIdentifier: action.payload }
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
      return { ...state, validFrom: action.payload }
    }
    case 'CHANGE_VALID_TO': {
      return { ...state, validTo: action.payload }
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
    default: return { ...state };
  }
}

export default reportFormReducer;
