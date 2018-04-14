function agencyReducer(state = {
  id: null,
  registrationStart: '',
  registrationValidTo: ''
}, action) {
  switch (action.type) {
    case 'GET_AGENCY': {
      return { ...state,
               id: action.payload.id,
               registrationStart: action.payload.registration_start,
               registrationValidTo: action.payload.registration_valid_to};
    };
    default: return { ...state };
  }
}

export default agencyReducer;
