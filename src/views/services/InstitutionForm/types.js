export default function getType(inputId) {
  return {
    name_official_transliterated: 'CHANGE_NAME_TRANSLITERATED',
    fileName: 'CHANGE_FILE_NAME'
  }[inputId];
}
