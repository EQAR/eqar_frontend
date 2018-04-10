const setStates = state => ({
  login: state.login,
  dashboard: state.dashboardBadges,
  reports: state.reports,
  reportForm: state.reportForm,
  institutions: state.institutions,
  countries: state.countries,
  agencies: state.agencies
});

export default setStates;
