import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';
import { getActivities } from './actions';

class agencyActivity extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.agencies = this.agencies.bind(this);
  }

  componentDidMount() {
    getActivities();
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id)
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
        <Label for="agencyActivity">Activity</Label>
        <Input type="select" name="select" id="agencyActivity" onChange={this.handleInput}>
          <option>Please Select</option>
          <option>Programme accreditation in Germany</option>
          <option>Instiutional accreditation in Austria</option>
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(agencyActivity);
