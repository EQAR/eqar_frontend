const setStates = state => ({
  login: state.login,
  dashboard: state.dashboardBadges,
  reports: state.reports,
  reportForm: state.reportForm,
  institutions: state.institutions,
  countries: state.countries
});

export default setStates;
