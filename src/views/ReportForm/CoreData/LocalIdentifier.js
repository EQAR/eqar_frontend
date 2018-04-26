import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';


class LocalIdentifier extends Component {
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
        <Label for="localIdentifier">Local report identifier</Label>
        <Input type="text" name="text" id="localIdentifier" placeholder="Enter the report local identifier" onChange={this.handleInput}/>
      </FormGroup>
    )
  }
}

export default connect(setStates)(LocalIdentifier);
