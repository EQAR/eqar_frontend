function agencyReducer(state = {
  id: null,
  valid_from: '',
  valid_to: ''
}, action) {
  switch (action.type) {
    case 'GET_AGENCY': {
      return { ...state,
               id: action.payload.id,
               valid_from: action.payload.registration_start,
               valid_to: action.payload.registration_valid_to};
    };
    default: return { ...state };
  }
}

export default agencyReducer;
