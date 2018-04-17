function dashboardReducer(state = {
  reports_total: 0,
  high_level_flags_total: 0,
  institutions_total: 0,
  programmes_total: 0,
  user: {
    username: "user",
    id: 0,
    email: ""
  }
}, action) {
  switch (action.type) {
    case 'GET_BADGES': {
      return { ...state,
              reports_total: action.payload.reports_total,
              high_level_flags_total: action.payload.high_level_flags_total,
              institutions_total: action.payload.institutions_total,
              programmes_total: action.payload.programmes_total
            };
    }
    case 'GET_USER': {
      return { ...state, 
              user: action.payload
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default dashboardReducer;
