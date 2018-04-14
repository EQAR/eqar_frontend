import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { fileForm } from './actions';


class Upload extends Component {
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
        <Label for="uploadedFile">Or Upload File</Label>
        <Input type="file" name="file" id="uploadedFile" onChange={this.handleInput} />
      </FormGroup>
    )
  }
}

export default connect(setStates)(Upload);
