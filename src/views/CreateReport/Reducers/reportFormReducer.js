function reportFormReducer(state = {
  agency: [],
  local_identifier: '',
  activity: [],
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
    case '': {
    }
    default: return { ...state };
  }
}

export default reportFormReducer;
