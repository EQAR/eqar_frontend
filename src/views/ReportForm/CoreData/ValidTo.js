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
    this.checkValidTo = this.checkValidTo.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  checkValidTo(fromDate) {
    return this.props.agency.registrationValidTo > fromDate ? true : false;
  }

  handleInput(e) {
    if (this.props.agency.registrationValidTo){
      this.checkValidTo(e.target.value) ? formFill(e.target.value, e.target.id) : false;
    }
  }

  render() {
    return (
      <FormGroup>
        <Label for="reportValidTo" className="required-input">Valid to</Label>
        <Input type="date" name="date" id="reportValidTo" value={this.props.reportForm.validTo} onChange={this.handleInput} />
      </FormGroup>
    )
  }
}

export default connect(setStates)(ValidTo);
