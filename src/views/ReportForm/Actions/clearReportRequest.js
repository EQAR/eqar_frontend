import lodash from 'lodash';

export const clearReportRequest = (formDatas) => {
  formDatas = addDateFormat(formDatas);
  formDatas = clearInstitution(formDatas);
  formDatas = removeEmptyStrings(formDatas);
  formDatas.programmes = clearProgrammes(formDatas);
  console.log(lodash.omitBy(formDatas, removeEmptyArrays));
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

const removeEmptyArrays = (value, key) => lodash.isEmpty(value);

const clearProgrammes = (object) => {
  return object.programmes.map(elem => {
    elem.alternative_names = lodash.remove(elem.alternative_names, (e) => !lodash.isEmpty(e));
    elem.identifiers = lodash.remove(elem.identifiers, (e) => !lodash.isEmpty(e));
    lodash.forEach(elem, (value, key, object) => {
      if (lodash.isEmpty(value)) {
        lodash.unset(object, key);
      }
    })
    return elem;
  })
}
