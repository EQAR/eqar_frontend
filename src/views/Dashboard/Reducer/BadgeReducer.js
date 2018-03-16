function badgeReducer(state = {
  reports_total: 0,
  high_level_flags_total: 0,
  institutions_total: 0,
  programmes_total: 0
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
    default: {
      return { ...state };
    }
  }
}

export default badgeReducer;
