import React, { Component } from 'react';
import {
  Button } from 'reactstrap';
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
  }

  addFile() {
    addFileToReport(this.props.reportFile, this.props.reportForm.report_files);
    resetFile();
  }

  addEditedFile() {
    addEditedFileToReport(this.props.reportFile, this.props.reportForm.report_files)
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
        <Button id={this.props.reportFile.file_index} size={'sm'} color="warning" onClick={ this.addEditedFile } disabled={this.isDisabled()}>Save File ></Button>
      )
    } else {
      return (
        <Button id="addFile" size={'sm'} color="primary" onClick={ this.addFile } disabled={this.isDisabled()}>Add File ></Button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.getButton()}
      </div>
    )
  }
}

export default connect(setStates)(AddFile);
