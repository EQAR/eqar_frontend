import lodash from 'lodash';

export const clearReportRequest = (formDatas) => {
  formDatas = addDateFormat(formDatas);
  formDatas = clearInstitution(formDatas);
  formDatas = removeUploadFile(formDatas);
  formDatas = removeEmptyStrings(formDatas);
  formDatas.programmes = clearProgrammes(formDatas);
  formDatas.report_links = clearLinks(formDatas);
  return lodash.omitBy(formDatas, removeEmptyArrays);
}

const addDateFormat = (formDatas) => {
  formDatas.date_format = '%Y-%m-%d';
  return formDatas;
}

const clearInstitution = (formDatas) => {
  formDatas.institutions = formDatas.institutions.map(institution => {
    return {deqar_id: institution.deqar_id}})
  return formDatas;
}

const removeUploadFile = (formDatas) => lodash.unset(formDatas, 'uploaded_file');

const removeEmptyStrings = (object) => {
  if (lodash.isArray(object)) {
    return object.map(innerObj => removeEmptyStrings(innerObj));
  } else if (lodash.isObject(object)) {
    lodash.forEach(object, (value, k, obj) => {
      if (value === '') {
        return lodash.unset(obj, k);
      }
      return removeEmptyStrings(value);
    })
  }
  return object;
}


const clearProgrammes = (object) => {
  return object.programmes.map(programme => {
    programme.alternative_names = lodash.remove(programme.alternative_names, (e) => !lodash.isEmpty(e));
    programme.identifiers = lodash.remove(programme.identifiers, (e) => !lodash.isEmpty(e));
    lodash.forEach(programme, (value, key, object) => {
      if (lodash.isEmpty(value)) {
        lodash.unset(object, key);
      }
    })
    return programme;
  })
}

const clearLinks = (object) => {
  return lodash.remove(object.report_links, (e) => !lodash.isEmpty(e));
}

const removeEmptyArrays = (value, key) => lodash.isEmpty(value);
