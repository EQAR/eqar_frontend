function loginReducer(state = {
  username: '',
  token: ''
}, action) {
  switch (action.type) {
    case 'LOGIN_BUTTON': {
      return { ...state, username: action.username, token: action.payload };
    }
    case 'FETCHING_USERS': {
      return { ...state, data: action.payload };
    }
    case 'FETCHING_TOKEN': {
      return { ...state, data: action.payload };
    }
    case 'TOKEN_PROVIDED': {
      return { ...state, token: action.payload, username: action.username };
    }
    case 'SET_USERNAME': {
      return { ...state, username: action.payload };
    }
    case 'ERROR': {
      return { ...state, error: action.payload };
    }
    default: return { ...state };
  }
}

export default loginReducer;
