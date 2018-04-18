const setStates = state => ({
  activities: state.activities,
  agencies: state.agencies,
  agency: state.agency,
  countries: state.countries,
  dashboard: state.dashboard,
  decisions: state.decisions,
  institutions: state.institutions,
  institutionReferences: state.institutionsRef,
  languages: state.languages,
  login: state.login,
  programme: state.programme,
  qfeheaLevels: state.qfeheaLevels,
  reportFile: state.reportFile,
  reportForm: state.reportForm,
  reports: state.reports,
  statuses: state.statuses
});

export default setStates;
