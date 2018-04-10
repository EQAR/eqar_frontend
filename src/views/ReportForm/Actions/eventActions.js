export default function eventActions(inputId) {
  return {
    localIdentifier: 'CHANGE_LOCAL_IDENTIFIER',
    agencyName: 'CHANGE_AGENCY_NAME',
    agencyActivity: 'CHANGE_AGENCY_ACTIVITY',
    status: 'CHANGE_STATUS',
    decision: 'CHANGE_DECISION',
    reportValidFrom: 'CHANGE_VALID_FROM',
    reportValidTo: 'CHANGE_VALID_TO',
    addProgramme: 'ADD_PROGRAMME'
  }[inputId];
}
