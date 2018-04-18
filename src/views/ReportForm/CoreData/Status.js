import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';
import { getStatuses } from './actions';


class Status extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.statuses = this.statuses.bind(this);
  }

  componentDidMount() {
    getStatuses();
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id);
  }

  statuses() {
    return this.props.statuses.statuses.map(status => {
      return (
        <option key={status.id}>{status.status}</option>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <Label for="status" className="required-input">Status</Label>
        <Input type="select" name="select" id="status" onChange={this.handleInput}>
          <option>Please Select</option>
          {this.statuses()}
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Status);
