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
import { closeInstitutionForm, institutionRequest } from './actions';
import { getInstituionCountries } from '../countries/actions';
import { CustomInputField, CustomDynamicInput, CustomSelectInput } from './CustomInputs';
import { selectInstitution } from '../../ReportForm/Institutions/actions';
import _ from 'lodash';



class InstitutionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getAlternativeNames = this.getAlternativeNames.bind(this);
    this.getQFEHEAOptions = this.getQFEHEAOptions.bind(this);
    this.getCountry = this.getCountry.bind(this);
    this.getOptionsCountry = this.getOptionsCountry.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.addToReport = this.addToReport.bind(this);
    this.edit = this.edit.bind(this);
    this.getQFEHEAOptions = this.getQFEHEAOptions.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.state = {
      isEdit: false,
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
      isEdit: true
    });
  }

  checkFields(inputId, index) {
    if (inputId === 'qf_ehea_levels') {
      return !_.isEmpty(this.props.institutionForm.institution.qf_ehea_levels);
    } else if (inputId === 'city') {
      return !_.isEmpty(this.props.institutionForm.institution.countries[index].city);
    } else if (inputId === 'lat') {
      return !this.props.institutionForm.institution.countries[index].lat === 0;
    } else if (inputId === 'long') {
      return !this.props.institutionForm.institution.countries[index].long === 0;
    } else {
      return !_.isEmpty(this.props.institutionForm.institution.names[inputId])
    }
  }

  isEditable(inputId, index) {
    console.log(inputId, this.checkFields(inputId, index))
    return this.state.isEdit ? this.checkFields(inputId, index) : true;
  }

  handleInput(e) {
    console.log(e.target.value, e.target.id);
  }

  handleDynamicInput(indexOfInput, e) {
    console.log(e.target.value, e.target.id, indexOfInput);
    // addAlterName(e.target.value, e.target.id, indexOfInput, this.props.programme.alternative_names);
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
          disabled: this.isEditable('transliteration'),
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
    return this.props.countries.countries.map(country => country.name_english)
  }

  getCountries() {
    return this.props.institutionForm.institution.countries.map((country, i) => {
      return [
        // {
        //   labelText: "Country",
        //   labelClassName: "required-input",
        //   type: "select",
        //   id: "country",
        //   disabled:"true",
        //   value: this.getCountry(country.country).name_english,
        //   options: this.getOptionsCountry(),
        //   handleInput: this.handleDynamicInput
        // },
        {
          labelText: "City",
          type: "text",
          Id: "city",
          name: "text",
          placeholder: "Enter city name",
          disabled: this.isEditable('city', i),
          value: country.city,
          handleInput: this.handleDynamicInput
        },
        {
          labelText: "Latitude",
          type: "number",
          Id: "lat",
          name: "number",
          placeholder: "Enter campus/city latitude",
          disabled: this.isEditable('lat', i),
          value: country.lat,
          handleInput: this.handleDynamicInput
        },
        {
          labelText: "Longitude",
          type: "number",
          Id: "long",
          name: "number",
          placeholder: "Enter campus/city longitude",
          disabled: this.isEditable('long', i),
          value: country.long,
          handleInput: this.handleDynamicInput
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
                    disabled={this.isEditable('name_official_transliterated')}
                    />
                  <CustomInputField
                    labelText="Institution Name, English"
                    type="text"
                    id="name_english"
                    name="text"
                    value={this.props.institutionForm.institution.names.name_english}
                    handleInput={this.handleInput}
                    disabled={this.isEditable('name_english')}
                    />
                  <CustomInputField
                    labelText="Institution Acronym"
                    type="text"
                    id="acronym"
                    name="text"
                    value={this.props.institutionForm.institution.names.acronym}
                    handleInput={this.handleInput}
                    disabled={this.isEditable('acronym')}
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
                    disabled={this.isEditable('national_identifier')}
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
                    disabled={this.isEditable('qf_ehea_levels')}
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
