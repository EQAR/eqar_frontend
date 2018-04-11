import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';


class ValidFrom extends Component {
  constructor(props) {
    super(props);
    this.checkValidFrom = this.checkValidFrom.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  checkValidFrom(fromDate) {
    return this.props.agency.rregistrationStart < fromDate ? true : false;
  }

  handleInput(e) {
    if (this.props.agency.registrationStart){
      this.checkValidFrom(e.target.value) ? formFill(e.target.value, e.target.id) : false;
    }
  }

  render() {
    return (
      <FormGroup>
        <Label for="reportValidFrom" className="required-input">Valid from</Label>
        <Input type="date" name="date" value={this.props.reportForm.validFrom} id="reportValidFrom" onChange={this.handleInput} />
      </FormGroup>
    )
  }
}

export default connect(setStates)(ValidFrom);
