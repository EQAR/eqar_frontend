function reportReducer(state = {
  count: 0,
  reports: [],
  next: '',
  previous: ''
}, action) {
  switch (action.type) {
    // case 'TOKEN_PROVIDED': {
    //   return { ...state,
    //            username: action.username,
    //            token: action.payload.token
    //          };
    // }
    default: return { ...state };
  }
}

export default reportReducer;
