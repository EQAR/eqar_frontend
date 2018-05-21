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
import { closeInstitutionForm, institutionRequest, saveToForm, changeCountryData } from './actions';
import { getInstituionCountries } from '../countries/actions';
import { CustomInputField, CustomDynamicInput, CustomSelectInput } from './CustomInputs';
import { selectInstitution } from '../../ReportForm/Institutions/actions';
import _ from 'lodash';



class InstitutionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCountriesInput = this.handleCountriesInput.bind(this);
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
      isEdit: false,
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
      isEdit: true,
      editableFields: {
        name_official_transliterated: this.checkFields('name_official_transliterated'),
        name_english: this.checkFields('name_english'),
        acronym: this.checkFields('acronym'),
        national_identifier: this.checkFields('national_identifier'),
        qf_ehea_levels: this.checkFields('qf_ehea_levels'),
        countries: this.checkCountryFields(),
        alternative_names: this.checkAlternativeNameFields()
      }
    })
    this.checkFields('name_official_transliterated')
  }

  checkFields(inputId) {
    if (inputId === 'qf_ehea_levels') {
      return _.isEmpty(this.props.institutionForm.institution.qf_ehea_levels);
    } else {
      return _.isEmpty(this.props.institutionForm.institution.names[inputId])
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
    return this.props.institutionForm.institution.names.alternative_names.map(name => {
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
    return this.state.isEdit ? !this.state.editableFields.alternative_names[index][inputId] : true;
  }

  handleInput(e) {
    saveToForm(e.target.value, e.target.id)
  }

  handleCountriesInput(indexOfInput, e) {
    changeCountryData(e.target.value, e.target.id, indexOfInput, this.props.institutionForm.institution.countries);
  }

  handleRemove(e) {
    console.log(e.target.id);
    // removeName(e.target.id, this.props.programme.alternative_names);
  }

  handleClick() {
    console.log('add empty');
    // addEmptyAlterName(this.props.programme.alternative_names);
  }

  getAlternativeNames() {
    const array = this.props.institutionForm.institution.names.alternative_names.map(alternativeName => {
      return [
        {
          labelText: "Alternative Institution Name",
          type: "text",
          id: "name",
          name: "text",
          placeholder: "Enter alternative institution name",
          value: alternativeName.name,
          disabled:"true",
          handleInput: this.handleDynamicInput
        },
        {
          labelText: "Alternative Institution Name, Transliterated",
          type: "text",
          Id: "transliteration",
          name: "text",
          placeholder: "Enter transliterated form",
          disabled: this.isEditableSimple('transliteration'),
          value: alternativeName.transliteration,
          handleInput: this.handleDynamicInput
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

  getFooter() {
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

  render() {
    console.log(this.state);
    const isOpen = !_.isEmpty(this.props.institutionForm.institution.names.alternative_names)
    return (
      <Modal size="xl" isOpen={this.props.institutionForm.formDisplay} toggle={this.toggle} className="table-modal" autoFocus={true} >
        <ModalHeader toggle={this.toggle}>
          View {this.props.institutionForm.institution.names.name_official} records
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
                    value={this.props.institutionForm.institution.names.name_official}
                    handleInput={this.handleInput}
                    disabled="true"
                    />
                  <CustomInputField
                    labelText="Institution Name, Transliterated"
                    type="text"
                    id="name_official_transliterated"
                    name="text"
                    value={this.props.institutionForm.institution.names.name_official_transliterated}
                    handleInput={this.handleInput}
                    disabled={this.isEditableSimple('name_official_transliterated')}
                    />
                  <CustomInputField
                    labelText="Institution Name, English"
                    type="text"
                    id="name_english"
                    name="text"
                    value={this.props.institutionForm.institution.names.name_english}
                    handleInput={this.handleInput}
                    disabled={this.isEditableSimple('name_english')}
                    />
                  <CustomInputField
                    labelText="Institution Acronym"
                    type="text"
                    id="acronym"
                    name="text"
                    value={this.props.institutionForm.institution.names.acronym}
                    handleInput={this.handleInput}
                    disabled={this.isEditableSimple('acronym')}
                    />
                  <CustomDynamicInput
                    headerName="Alternative Names"
                    toggleButton={true}
                    addNewItemText="Add New Name"
                    buttonDisabled={!this.state.isEdit}
                    handleClick={this.handleClick}
                    valueArray={this.getAlternativeNames()}
                    open={isOpen}
                    />
                  <CustomDynamicInput
                    headerName="Geographic Locations"
                    headerClassName="required-input"
                    toggleButton={false}
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
                    handleInput={this.handleInput}
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
