import React, { Component } from 'react';
import {
  Button } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addFileToReport, resetFile } from './actions';
import lodash from 'lodash';


class AddFile extends Component {
  constructor(props) {
    super(props);
    this.addFile = this.addFile.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  addFile(event) {
    addFileToReport(this.props.reportFile, this.props.reportForm.report_files);
    resetFile();
  }

  isDisabled() {
    return lodash.isEmpty(this.props.reportFile.report_language);
  }

  render() {
    return (
      <Button id="addFile" size={'sm'} color="primary" onClick={ this.addFile } disabled={this.isDisabled()}>Add File ></Button>
    )
  }
}

export default connect(setStates)(AddFile);
