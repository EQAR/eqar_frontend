import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { fileForm } from './actions';
import lodash from 'lodash';


class FileUrl extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  handleInput(e) {
    fileForm(e.target.value, e.target.id);
  }

  isDisabled(index) {
    return !lodash.isEmpty(this.props.reportFile.uploaded_file);
  }

  render() {
    return (
      <FormGroup>
        <Label for="fileUrl">File URL</Label>
        <Input type="text" name="text" id="fileUrl" onChange={this.handleInput} value={this.props.reportFile.original_location} placeholder="Enter file location URL" disabled={this.isDisabled()}/>
      </FormGroup>
    )
  }
}

export default connect(setStates)(FileUrl);
