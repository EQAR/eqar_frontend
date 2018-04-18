import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { fileForm } from './actions';


class FileName extends Component {
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
        <Label for="fileName">File Display Name</Label>
        <Input type="text" name="text" id="fileName" onChange={this.handleInput} value={this.props.reportFile.display_name} placeholder="Enter file name for display" />
      </FormGroup>
    )
  }
}

export default connect(setStates)(FileName);
