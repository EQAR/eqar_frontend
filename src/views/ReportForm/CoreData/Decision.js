import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';


class Decision extends Component {
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
        <Label for="decision" className="required-input">Decision</Label>
        <Input type="select" name="select" id="decision" onChange={this.handleInput}>
          <option>Please Select</option>
          <option>positive</option>
          <option>positive with conditions or restrictions</option>
          <option>negative</option>
          <option>not applicable</option>
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Decision);
