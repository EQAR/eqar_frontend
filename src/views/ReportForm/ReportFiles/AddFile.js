import React, { Component } from 'react';
import {
  Button,
  Col,
  Row} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addFileToReport, resetFile, addEditedFileToReport } from './actions';
import lodash from 'lodash';


class AddFile extends Component {
  constructor(props) {
    super(props);
    this.addFile = this.addFile.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.getButton = this.getButton.bind(this);
    this.addEditedFile = this.addEditedFile.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  addFile() {
    addFileToReport(this.props.reportFile, this.props.reportForm.report_files);
    resetFile();
  }

  addEditedFile() {
    addEditedFileToReport(this.props.reportFile, this.props.reportForm.report_files)
    resetFile();
  }

  cancel() {
    resetFile();
  }

  isDisabled() {
    return (
      lodash.isEmpty(this.props.reportFile.report_language) || (
        this.props.reportFile.original_location === '' &&
        this.props.reportFile.uploaded_file === ''
      )
    )
  }

  getButton() {
    if (this.props.reportFile.file_index !== null) {
      return (
        <Row>
          <Col>
            <Button id={this.props.reportFile.file_index} size={'sm'} color="warning" onClick={ this.addEditedFile } disabled={this.isDisabled()}>Save File ></Button>
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
            <Button id="addFile" size={'sm'} color="primary" onClick={ this.addFile } disabled={this.isDisabled()}>Add File ></Button>
          </Col>
          <Col>
            <Button id="resetFile" size={'sm'} color="primary" onClick={ this.cancel } >Reset</Button>
          </Col>
        </Row>
      )
    }
  }

  render() {
    return this.getButton()
  }
}

export default connect(setStates)(AddFile);
