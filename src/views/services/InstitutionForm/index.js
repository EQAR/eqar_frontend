import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  Button} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { closeInstitutionForm, institutionRequest, saveToForm, changeCountryData, changeQFEHEALEVELS, addEmptyAlternativeName, addAlternativeName, removeAlterName, resetFields, putInstitution } from './actions';
import { getInstituionCountries } from '../countries/actions';
import { CustomInputField, CustomDynamicInput, CustomSelectInput } from './CustomInputs';
import { selectInstitution } from '../../ReportForm/Institutions/actions';
import _ from 'lodash';



class InstitutionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCountriesInput = this.handleCountriesInput.bind(this);
    this.handleAlterNamesInput = this.handleAlterNamesInput.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.addEmptyAlterName = this.addEmptyAlterName.bind(this);
    this.getAlternativeNames = this.getAlternativeNames.bind(this);
    this.getQFEHEAOptions = this.getQFEHEAOptions.bind(this);
    this.getCountry = this.getCountry.bind(this);
    this.getOptionsCountry = this.getOptionsCountry.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.addToReport = this.addToReport.bind(this);
    this.edit = this.edit.bind(this);
    this.getQFEHEAOptions = this.getQFEHEAOptions.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.checkCountryFields = this.checkCountryFields.bind(this);
    this.checkAlternativeNameFields = this.checkAlternativeNameFields.bind(this);
    this.state = {
      validNames: [],
      isEdit: false,
      removeButtonIndex: null,
      editableFields: {
        name_official_transliterated: false,
        name_english: false,
        acronym: false,
        national_identifier: false,
        qf_ehea_levels: false,
        countries: [],
        alternative_names: []
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return _.isInteger(nextProps.institutionForm.institution.id);
  }

  cancel() {
    this.state.isEdit ? institutionRequest(this.props.institutionForm.institution.id) : resetFields();
    this.setState({
      isEdit: false
    })
  }

  save() {
    let institution = store.getState().institutionForm.institution;
    institution.names.push(this.props.institutionForm.validName);
    institution.qf_ehea_levels = this.props.institutionForm.institution.qf_ehea_levels.map(level => {
      return {
        qf_ehea_level: level.qf_ehea_level
      }
    });
    putInstitution(institution);
  }

  toggle() {
    this.setState({
      isEdit: false
    })
    closeInstitutionForm();
  }

  addToReport() {
    const institution = _.find(this.props.institutionReferences.institutions, {id: this.props.institutionForm.institution.id})
    selectInstitution(institution, this.props.reportForm.institutions);
    this.toggle();
  }

  edit() {
    this.setState({
      removeButtonIndex: this.props.institutionForm.validName.alternative_names.length,
      isEdit: true,
      editableFields: {
        name_official_transliterated: this.checkFields('name_official_transliterated'),
        name_english: this.checkFields('name_english'),
        acronym: this.checkFields('acronym'),
        national_identifier: this.checkFields('national_identifier'),
        qf_ehea_levels: this.checkFields('qf_ehea_levels'),
        countries: this.checkCountryFields(),
        alternative_names: this.checkAlternativeNameFields(),
      }
    })
  }

  checkFields(inputId) {
    if (inputId === 'qf_ehea_levels') {
      return _.isEmpty(this.props.institutionForm.institution.qf_ehea_levels);
    } else {
      return _.isEmpty(this.props.institutionForm.validName[inputId])
    }
  }

  checkCountryFields() {
    return this.props.institutionForm.institution.countries.map(country => {
      return {
        city: _.isEmpty(country.city),
        lat: _.isEmpty(country.lat),
        long: _.isEmpty(country.long)
      }
    })
  }

  checkAlternativeNameFields() {
    return this.props.institutionForm.validName.alternative_names.map(name => {
      return {
        name: _.isEmpty(name.name),
        transliteration: _.isEmpty(name.transliteration)
      }
    })
  }

  isEditableSimple(inputId) {
    return this.state.isEdit ? !this.state.editableFields[inputId] : true;
  }

  isEditableCountry(inputId, index) {
    return this.state.isEdit ? !this.state.editableFields.countries[index][inputId] : true;
  }

  isEditableAlternativeNames(inputId, index) {
    return this.state.isEdit && this.state.editableFields.alternative_names[index] ? !this.state.editableFields.alternative_names[index][inputId] : !_.has(this.props.institutionForm.validName.alternative_names[index], inputId);
  }

  handleInput(e) {
    saveToForm(e.target.value, e.target.id)
  }

  handleQFEHEAInput(value) {
    changeQFEHEALEVELS(value)
  }

  handleCountriesInput(indexOfInput, e) {
    changeCountryData(e.target.value, e.target.id, indexOfInput, this.props.institutionForm.institution.countries);
  }

  handleAlterNamesInput(indexOfInput, e) {
    addAlternativeName(e.target.value, e.target.id, indexOfInput, this.props.institutionForm.validName.alternative_names);
  }

  handleRemove(e) {
    removeAlterName(e.target.id, this.props.institutionForm.validName.alternative_names);
  }

  addEmptyAlterName() {
    addEmptyAlternativeName(this.props.institutionForm.validName.alternative_names);
  }

  getAlternativeNames() {
    const array = this.props.institutionForm.validName.alternative_names.map((alternativeName, i) => {
      return [
        {
          labelText: "Alternative Institution Name",
          type: "text",
          id: "name",
          name: "text",
          placeholder: "Enter alternative institution name",
          value: alternativeName.name,
          disabled: this.isEditableAlternativeNames('name', i),
          handleInput: this.handleAlterNamesInput
        },
        {
          labelText: "Alternative Institution Name, Transliterated",
          type: "text",
          id: "transliteration",
          name: "text",
          placeholder: "Enter transliterated form",
          disabled: this.isEditableAlternativeNames('transliteration', i),
          value: alternativeName.transliteration,
          handleInput: this.handleAlterNamesInput
        }
      ]
    });
    return array
  }

  getCountry(countryId) {
    return _.find(this.props.countries.countries, {id: countryId})
  }

  getOptionsCountry() {
    return this.props.countries.countries.map(country => {
      return {
        value: country.name_english,
        label: country.name_english
      }
    })
  }

  getCountries() {
    return this.props.institutionForm.institution.countries.map((country, i) => {
      return [
        {
          labelText: "Country",
          labelClassName: "required-input",
          type: "select",
          id: "country",
          disabled:true,
          value: this.getCountry(country.country).name_english,
          options: this.getOptionsCountry(),
          handleInput: this.handleCountriesInput,
          multi: false
        },
        {
          labelText: "City",
          type: "text",
          id: "city",
          name: "text",
          placeholder: "Enter city name",
          disabled: this.isEditableCountry('city', i),
          value: country.city,
          handleInput: this.handleCountriesInput
        },
        {
          labelText: "Latitude",
          type: "number",
          id: "lat",
          name: "number",
          placeholder: "Enter campus/city latitude",
          disabled: this.isEditableCountry('lat', i),
          value: country.lat,
          handleInput: this.handleCountriesInput
        },
        {
          labelText: "Longitude",
          type: "number",
          id: "long",
          name: "number",
          placeholder: "Enter campus/city longitude",
          disabled: this.isEditableCountry('long', i),
          value: country.long,
          handleInput: this.handleCountriesInput
        }
      ]
    });
  }

  getQFEHEALabel(qf_ehea_level) {
    return {
      1: 'short cycle',
      2: 'first cycle',
      3: 'second cycle',
      4: 'third cycle'
    }[qf_ehea_level]
  }

  getQFEHEAOptions() {
    return this.props.qfeheaLevels.levels.map(level => {
      return {
        value: level.id,
        label: level.level
      }
    })
  }

  getQFEHEAValues() {
    return this.props.institutionForm.institution.qf_ehea_levels.map(level => {
      return {
        value: level.qf_ehea_level,
        label: this.getQFEHEALabel(level.qf_ehea_level)};
    })
  }

  editFooter () {
    return (
      <ModalFooter>
       <Col>
        <Button color="primary" onClick={this.save}>Save Record</Button>
      </Col>
        <Button color="primary" onClick={this.cancel}>Cancel</Button>
      </ModalFooter>
    )
  }

  viewFooter() {
    return (
      <ModalFooter>
       <Col>
        <Button color="primary" onClick={ this.toggle }>Close</Button>
      </Col>
        <Button color="primary" onClick={ this.edit }>Edit Record</Button>
        <Button color="primary" onClick={ this.addToReport }>Add To Report</Button>
      </ModalFooter>
    )
  }

  getFooter() {
    return this.state.isEdit ? this.editFooter() : this.viewFooter();
  }

  render() {
    const isOpen = !_.isEmpty(this.props.institutionForm.validName.alternative_names);
    return (
      <Modal size="xl" isOpen={this.props.institutionForm.formDisplay} toggle={this.toggle} className="table-modal" autoFocus={true} >
        <ModalHeader toggle={this.toggle}>
          View {this.props.institutionForm.validName.name_official} records
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="6">
              <Card className="info-box">
                <CardBody>
                  <CustomInputField
                    labelText="Institution Name, Official"
                    labelClassName="required-input"
                    type="text"
                    id="name_official"
                    name="text"
                    value={this.props.institutionForm.validName.name_official}
                    handleInput={this.handleInput}
                    disabled="true"
                    />
                  <CustomInputField
                    labelText="Institution Name, Transliterated"
                    type="text"
                    id="name_official_transliterated"
                    name="text"
                    value={this.props.institutionForm.validName.name_official_transliterated}
                    handleInput={this.handleInput}
                    disabled={this.isEditableSimple('name_official_transliterated')}
                    />
                  <CustomInputField
                    labelText="Institution Name, English"
                    type="text"
                    id="name_english"
                    name="text"
                    value={this.props.institutionForm.validName.name_english}
                    handleInput={this.handleInput}
                    disabled={this.isEditableSimple('name_english')}
                    />
                  <CustomInputField
                    labelText="Institution Acronym"
                    type="text"
                    id="acronym"
                    name="text"
                    value={this.props.institutionForm.validName.acronym}
                    handleInput={this.handleInput}
                    disabled={this.isEditableSimple('acronym')}
                    />
                  <CustomDynamicInput
                    headerName="Alternative Names"
                    toggleButton={true}
                    addNewItemText="Add New Name"
                    buttonDisabled={!this.state.isEdit}
                    handleClick={this.addEmptyAlterName}
                    handleRemove={this.handleRemove}
                    removeButton={this.state.isEdit}
                    removeButtonIndex={this.state.removeButtonIndex}
                    valueArray={this.getAlternativeNames()}
                    open={isOpen}
                    />
                  <CustomDynamicInput
                    headerName="Geographic Locations"
                    headerClassName="required-input"
                    toggleButton={false}
                    removeButton={false}
                    valueArray={this.getCountries()}
                    open={true}
                    />
                  <CustomInputField
                    labelText="National Identifier"
                    type="text"
                    id="national_identifier"
                    name="text"
                    handleInput={this.handleInput}
                    disabled={this.isEditableSimple('national_identifier')}
                    />
                  <CustomInputField
                    labelText="Local Identifier"
                    type="text"
                    id="local_identifier"
                    name="text"
                    handleInput={this.handleInput}
                    disabled={!this.state.isEdit}
                    />
                  <CustomSelectInput
                    labelText="QF-EHEA Levels"
                    id="qf_ehea_levels"
                    handleInput={this.handleQFEHEAInput}
                    options={this.getQFEHEAOptions()}
                    value={this.getQFEHEAValues()}
                    multi={true}
                    disabled={this.isEditableSimple('qf_ehea_levels')}
                  />
                  <CustomInputField
                    labelText="Institution Website"
                    type="text"
                    id="website_link"
                    name="text"
                    value={this.props.institutionForm.institution.website_link}
                    handleInput={this.handleInput}
                    disabled="true"
                    />
                </CardBody>

              </Card>
            </Col>
            <Col xs="6">
              <Card className="info-box">
                <CardBody>
                  <CustomInputField
                    labelText="DEQUARINST ID"
                    type="text"
                    id="deqar_id"
                    name="text"
                    value={this.props.institutionForm.institution.deqar_id}
                    disabled="true"
                    />
                  <CustomInputField
                    labelText="ETER ID"
                    type="text"
                    id="id"
                    name="text"
                    value={this.props.institutionForm.institution.id}
                    disabled="true"
                    />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
          {this.getFooter()}
      </Modal>
    )
  }
}

export default connect(setStates)(InstitutionModal);
