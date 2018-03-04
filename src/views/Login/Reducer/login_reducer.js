function loginReducer(state = {
  username: '',
  token: '',
  account: '',
  errorMessage: ''
}, action) {
  switch (action.type) {
    case 'TOKEN_PROVIDED': {
      return { ...state,
               username: action.username,
               token: action.payload.token
             };
    }
    default: return { ...state };
  }
}

export default loginReducer;
