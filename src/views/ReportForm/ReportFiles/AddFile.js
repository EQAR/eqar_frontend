import React, { Component } from 'react';
import {
  Button } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addFileToReport, resetFile } from './actions';


class AddFile extends Component {
  constructor(props) {
    super(props);
    this.addFile = this.addFile.bind(this);
  }

  addFile(event) {
    addFileToReport(this.props.reportFile, this.props.reportForm.reportFiles);
    resetFile();
  }

  render() {
    return (
      <Button id="addFile" color="primary" onClick={ this.addFile }>Add File ></Button>
    )
  }
}

export default connect(setStates)(AddFile);
