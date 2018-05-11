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
import { closeInstitutionForm } from './actions';
import { CustomInputField, CustomDynamicInput, CustomSelectInput } from './CustomInputs';
import _ from 'lodash';



class InstitutionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getValueArray = this.getValueArray.bind(this);
    this.getOptions = this.getOptions.bind(this);
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

  getValueArray() {
    const validName = _.find(this.props.institutionForm.institution.names, (name => name.name_valid_to === null))
    return validName.alternative_names;
  }

  getOptions() {
    return this.props.institutionForm.institution.qf_ehea_levels.map(level => {
      return level.qf_ehea_level;
    })
  }

  render() {
    const validName = _.find(this.props.institutionForm.institution.names, (name => name.name_valid_to === null))
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
                    handleClick={this.handleClick}
                    isDisabled={this.isDisabled}
                    addNewItemText="Add More"
                    valueArray={[{
                      name_alternative: 'lajos',
                      name_transliterated: 'feri'
                    }]}
                    handleInput={this.handleDynamicInput}
                    firstLabelText="Alternative Institution Name"
                    secondLabelText="Alternative Institution Name, Transliterated"
                    type="text"
                    firstId="alternative_name_official"
                    secondId="alternative_name_transliterated"
                    name="text"
                    firstPlaceholder="Enter alternative institution name"
                    secondPlaceholder="Enter transliterated form"
                    firstDisplayValue="name_alternative"
                    secondDisplayValue="name_transliterated"
                    valueArray={validName.alternative_names}
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
