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
import { CustomInputField, CustomDynamicInput } from './CustomInputs';


class InstitutionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
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

  isDisabled(i) {
    return false
  }

  render() {
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
                    handleInput={this.handleInput}
                    />
                  <CustomInputField
                    labelText="Institution Name, Transliterated"
                    type="text"
                    id="name_official_transliterated"
                    name="text"
                    handleInput={this.handleInput}
                    />
                  <CustomInputField
                    labelText="Institution Name, English"
                    type="text"
                    id="name_english"
                    name="text"
                    handleInput={this.handleInput}
                    />
                  <CustomInputField
                    labelText="Institution Acronym"
                    type="text"
                    id="acronym"
                    name="text"
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
                    inputDisabled={this.isDisabled}
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


                  <CustomInputField
                    labelText="Institution Website"
                    type="text"
                    id="website_link"
                    name="text"
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
