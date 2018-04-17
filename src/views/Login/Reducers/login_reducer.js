function loginReducer(state = {
  username: '',
  token: '',
  account: '',
  loginDisplay: false,
  errorMessage: ''
}, action) {
  switch (action.type) {
    case 'TOKEN_PROVIDED': {
      return { ...state,
               username: action.username,
               token: action.payload.token
             };
    }
    case 'LOGIN_ALERT': {
      return { 
        ...state, 
        loginDisplay: action.payload
      };
    }
    default: return { ...state };
  }
}

export default loginReducer;
