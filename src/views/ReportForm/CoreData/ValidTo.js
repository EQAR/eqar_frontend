import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';


class ValidTo extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id)
  }

  render() {
    return (
      <FormGroup>
        <Label for="reportValidTo" >Valid to</Label>
        <Input type="date" name="date" id="reportValidTo" value={this.props.reportForm.validTo} onChange={this.handleInput} max={this.props.agency.valid_to}/>
      </FormGroup>
    )
  }
}

export default connect(setStates)(ValidTo);
