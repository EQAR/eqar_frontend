function agencyReducer(state = {
  id: null,
  registration_start: '',
  registration_valid_to: ''
}, action) {
  switch (action.type) {
    case 'GET_AGENCY': {
      return { ...state,
               id: action.payload.id,
               registration_start: action.payload.registration_start,
               registration_valid_to: action.payload.registration_valid_to};
    };
    default: return { ...state };
  }
}

export default agencyReducer;
