import lodash from 'lodash';

export const clearReportRequest = (formDatas) => {
  let reqData = lodash.cloneDeep(formDatas);
  reqData = addDateFormat(reqData);
  reqData = clearInstitution(reqData);
  reqData = removeEmptyStrings(reqData);
  reqData.report_files = clearUploadFile(reqData);
  reqData.programmes = clearProgrammes(reqData);
  reqData.report_links = clearLinks(reqData);
  return lodash.omitBy(reqData, removeEmptyArrays);
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

const clearUploadFile = (formDatas) => {
  return formDatas.report_files.map(reportFile => {
    lodash.unset(reportFile, 'uploaded_file');
    lodash.unset(reportFile, 'file_index');
    reportFile.report_language = reportFile.report_language.map(language => language.value)
    return reportFile;
  })
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


const clearProgrammes = (object) => {
  return object.programmes.map(programme => {
    programme.alternative_names = lodash.remove(programme.alternative_names, (e) => !lodash.isEmpty(e));
    programme.identifiers = lodash.remove(programme.identifiers, (e) => !lodash.isEmpty(e));
    programme.countries = programme.countries.map(country => country.value)
    lodash.unset(programme, 'programme_index');
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
