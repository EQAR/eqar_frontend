import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { programmeForm } from './actions';


class NQFLevel extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    programmeForm(e.target.value, e.target.id);
  }

  render() {
    return (
      <FormGroup>
        <Label for="NQFLevel">NQF level</Label>
        <Input type="text" name="text" id="NQFLevel" value={this.props.programme.nqfLevel} onChange={ this.handleInput } />
      </FormGroup>
    )
  }
}

export default connect(setStates)(NQFLevel);
