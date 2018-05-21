export default function getType(inputId) {
  return {
    name_official_transliterated: 'CHANGE_NAME_TRANSLITERATED',
    name_english: 'CHANGE_NAME_ENGLISH',
    acronym: 'CHANGE_ACRONYM',
    national_identifier: 'CHANGE_NATIONAL_IDENTIFIER',
    local_identifier: 'CHANGE_LOCAL_IDENTIFIER'
  }[inputId];
}
