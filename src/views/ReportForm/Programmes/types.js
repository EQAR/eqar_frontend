export default function getType(inputId) {
  return {
    programmeName: 'CHANGE_PROGRAMME_NAME',
    qualificationName: 'CHANGE_QUALIFICATION',
    qfeheaLevel: 'CHANGE_QFEHEA_LEVEL',
    NQFLevel: 'CHANGE_NQF_LEVEL'
  }[inputId];
}
