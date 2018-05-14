const setStates = state => ({
  activities: state.activities,
  agencies: state.agencies,
  agency: state.agency,
  message: state.message,
  countries: state.countries,
  dashboard: state.dashboard,
  decisions: state.decisions,
  institutionReferences: state.institutionsRef,
  institutionForm: state.institutionForm,
  languages: state.languages,
  login: state.login,
  programme: state.programme,
  qfeheaLevels: state.qfeheaLevels,
  reportFile: state.reportFile,
  reportForm: state.reportForm,
  reports: state.reports,
  csvData: state.csvData,
  statuses: state.statuses
});

export default setStates;
