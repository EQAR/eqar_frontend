import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { closeInstitutionForm, institutionRequest } from './actions';
import { getInstituionCountries } from '../countries/actions';
import { CustomInputField, CustomDynamicInput, CustomSelectInput } from './CustomInputs';
import _ from 'lodash';



class InstitutionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getAlternativeNames = this.getAlternativeNames.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.getCountry = this.getCountry.bind(this);
    this.getCountries = this.getCountries.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return _.isInteger(nextProps.institutionForm.institution.id);
  }

  toggle() {
    closeInstitutionForm();
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
    const validName = _.find(this.props.institutionForm.institution.names, (name => name.name_valid_to === null))
    const array = validName.alternative_names.map(alternativeName => {
      return [
        {
          labelText: "Alternative Institution Name",
          type: "text",
          id: "name",
          name: "text",
          placeholder: "Enter alternative institution name",
          value: alternativeName.name,
          handleInput: this.handleDynamicInput
        },
        {
          labelText: "Alternative Institution Name, Transliterated",
          type: "text",
          Id: "transliteration",
          name: "text",
          placeholder: "Enter transliterated form",
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

  getCountries() {
    return this.props.institutionForm.institution.countries.map(country => {
      return [
        {
          labelText: "Country",
          labelClassName: "required-input",
          type: "select",
          id: "country",
          value: this.getCountry(country.country).name_english,
          options: this.props.institutionForm.countries,
          handleInput: this.handleDynamicInput
        },
        {
          labelText: "City",
          type: "text",
          Id: "city",
          name: "text",
          placeholder: "Enter city name",
          value: country.city,
          handleInput: this.handleDynamicInput
        },
        {
          labelText: "Latitude",
          type: "number",
          Id: "lat",
          name: "number",
          placeholder: "Enter campus/city latitude",
          value: country.lat,
          handleInput: this.handleDynamicInput
        },
        {
          labelText: "Longitude",
          type: "number",
          Id: "long",
          name: "number",
          placeholder: "Enter campus/city longitude",
          value: country.long,
          handleInput: this.handleDynamicInput
        }
      ]
    });
  }

  getOptions() {
    return this.props.institutionForm.institution.qf_ehea_levels.map(level => {
      return level.qf_ehea_level;
    })
  }

  render() {
    const validName = _.find(this.props.institutionForm.institution.names, (name => name.name_valid_to === null))
    const isOpen = !_.isEmpty(validName.alternative_names)
    return (
      <Modal size="xl" isOpen={this.props.institutionForm.formDisplay} toggle={this.toggle} className="table-modal" autoFocus={true} >
        <ModalHeader toggle={this.toggle}>
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
                    value={validName.name_official}
                    handleInput={this.handleInput}
                    />
                  <CustomInputField
                    labelText="Institution Name, Transliterated"
                    type="text"
                    id="name_official_transliterated"
                    name="text"
                    value={validName.name_official_transliterated}
                    handleInput={this.handleInput}
                    />
                  <CustomInputField
                    labelText="Institution Name, English"
                    type="text"
                    id="name_english"
                    name="text"
                    value={validName.name_english}
                    handleInput={this.handleInput}
                    />
                  <CustomInputField
                    labelText="Institution Acronym"
                    type="text"
                    id="acronym"
                    name="text"
                    value={validName.acronym}
                    handleInput={this.handleInput}
                    />
                  <CustomDynamicInput
                    headerName="Alternative Names"
                    toggleButton={true}
                    addNewItemText="Add New Name"
                    handleClick={this.handleClick}
                    valueArray={this.getAlternativeNames()}
                    open={isOpen}
                    />
                  <CustomDynamicInput
                    headerName="Geographic Locations"
                    labelClassName="required-input"
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
                    />
                  <CustomInputField
                    labelText="Local Identifier"
                    type="text"
                    id="local_identifier"
                    name="text"
                    handleInput={this.handleInput}
                    />
                  <CustomSelectInput
                    labelText="QF-EHEA Levels"
                    id="qf_ehea_levels"
                    handleInput={this.handleInput}
                    options={this.getOptions()}
                  />
                  <CustomInputField
                    labelText="Institution Website"
                    type="text"
                    id="website_link"
                    name="text"
                    value={this.props.institutionForm.institution.website_link}
                    handleInput={this.handleInput}
                    />
                </CardBody>

              </Card>
            </Col>
            <Col xs="6">
              <Card className="info-box">

                <CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    )
  }
}

export default connect(setStates)(InstitutionModal);
