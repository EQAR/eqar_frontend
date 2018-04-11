import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';


class Status extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id);
  }

  render() {
    return (
      <FormGroup>
        <Label for="status" className="required-input">Status</Label>
        <Input type="select" name="select" id="status" onChange={this.handleInput}>
          <option>Please Select</option>
          <option>part of obligatory EQA system</option>
          <option>voluntary</option>
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Status);
