import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';
import { getAgencies, getAgency } from './actions';

class Agency extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.agencies = this.agencies.bind(this);
  }

  componentDidMount() {
    getAgencies();
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id);
    getAgency(e.target[e.target.selectedIndex].id);
  }

  agencies() {
    return this.props.agencies.agencies.map((agency, i) => {
      return (
        <option key={i} id={agency.id}>{agency.acronym_primary}</option>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <Label for="agencyName" className="required-input">Agency</Label>
        <Input type="select" name="select" id="agencyName" value={this.props.reportForm.agency} onChange={this.handleInput} >
          <option>Please select</option>
          {this.agencies()}
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Agency);
