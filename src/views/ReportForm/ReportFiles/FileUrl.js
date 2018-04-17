import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { fileForm } from './actions';


class FileUrl extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    fileForm(e.target.value, e.target.id);
  }

  render() {
    return (
      <FormGroup>
        <Label for="fileUrl">File URL</Label>
        <Input type="text" name="text" id="fileUrl" onChange={this.handleInput} value={this.props.reportFile.original_location} placeholder="Enter file location URL"/>
      </FormGroup>
    )
  }
}

export default connect(setStates)(FileUrl);
