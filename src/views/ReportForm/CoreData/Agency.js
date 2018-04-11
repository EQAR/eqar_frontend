import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';
import { getAgencies } from './actions';

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
  }

  agencies() {
    return this.props.agencies.agencies.map(agency => {
      return (
        <option key={agency.id}>{agency.acronym_primary}</option>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <Label for="agencyName">Agency</Label>
        <Input type="select" name="select" id="agencyName" onChange={this.handleInput}>
          {this.agencies()}
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Agency);
