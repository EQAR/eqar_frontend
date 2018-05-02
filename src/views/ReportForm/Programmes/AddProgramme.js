import React, { Component } from 'react';
import {
  Button,
  Row,
  Col} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addProgrammeToReport, addEditedProgrammeToReport, resetProgramme } from './actions';
import lodash from 'lodash';


class AddProgramme extends Component {
  constructor(props) {
    super(props);
    this.addProgramme = this.addProgramme.bind(this);
    this.addEditedProgramme = this.addEditedProgramme.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  addProgramme(event) {
    addProgrammeToReport(this.props.programme, this.props.reportForm.programmes);
    resetProgramme();
  }

  addEditedProgramme() {
    addEditedProgrammeToReport(this.props.programme, this.props.reportForm.programmes)
    resetProgramme();
  }

  cancel() {
    resetProgramme();
  }

  isDisabled() {
    return this.props.programme.name_primary === '';
  }

  getButton() {
    if (this.props.programme.programme_index !== null) {
      return (
        <Row>
          <Col>
            <Button id={this.props.programme.programme_index} size={'sm'} color="warning" onClick={ this.addEditedProgramme } disabled={this.isDisabled()}>Save Programme ></Button>
          </Col>
          <Col>
            <Button id="cancelFile" size={'sm'} color="warning" onClick={ this.cancel } >Cancel</Button>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row>
          <Col>
            <Button id="addFile" size={'sm'} color="primary" onClick={ this.addProgramme } disabled={this.isDisabled()}>Add Programme ></Button>
          </Col>
          <Col>
            <Button id="resetFile" size={'sm'} color="danger" onClick={ this.cancel } className="float-right">Reset</Button>
          </Col>
        </Row>
      )
    }
  }

  render() {
    return this.getButton()
  }
}


export default connect(setStates)(AddProgramme);
