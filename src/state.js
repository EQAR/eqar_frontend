const setStates = state => ({
  activities: state.activities,
  agencies: state.agencies,
  agency: state.agency,
  countries: state.countries,
  dashboard: state.dashboard,
  institutions: state.institutions,
  institutionReferences: state.institutionsRef,
  languages: state.languages,
  login: state.login,
  programme: state.programme,
  qfeheaLevels: state.qfeheaLevels,
  reportFile: state.reportFile,
  reportForm: state.reportForm,
  reports: state.reports,
  csvData: state.csvData
});

export default setStates;
