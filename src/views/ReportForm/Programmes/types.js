export default function getType(inputId) {
  return {
    programmeName: 'CHANGE_PROGRAMME_NAME',
    qualificationName: 'CHANGE_QUALIFICATION'
  }[inputId];
}
