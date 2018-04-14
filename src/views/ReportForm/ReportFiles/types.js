export default function getType(inputId) {
  return {
    fileUrl: 'CHANGE_FILE_URL',
    uploadedFile: 'CHANGE_UPLOADED_FILE'
  }[inputId];
}
