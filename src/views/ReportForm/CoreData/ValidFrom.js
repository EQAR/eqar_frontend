import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label,
  FormFeedback} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';


class ValidFrom extends Component {
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
        <Label for="reportValidFrom" className="required-input">Valid from</Label>
        <Input type="date" name="date" value={this.props.reportForm.validFrom} id="reportValidFrom" onChange={this.handleInput} min={this.props.agency.valid_from}/>
      </FormGroup>
    )
  }
}

export default connect(setStates)(ValidFrom);
