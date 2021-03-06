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
    this.activities = this.activities.bind(this);
  }

  componentDidMount() {
    getActivities();
  }

  handleInput(e) {
    const selectedIndex = e.target.options.selectedIndex;
    const optionKey = e.target.options[selectedIndex].getAttribute('data-key');
    formFill(optionKey, e.target.id);
  }

  activities() {
    const agencyActivities = this.props.activities.activities.filter(activity => activity.agency === this.props.reportForm.agency);
    return agencyActivities.map(activity => {
      return (
        <option key={activity.id} data-key={activity.id}>{activity.id} - {activity.activity}</option>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <Label for="agencyActivity" className="required-input">Activity</Label>
        <Input type="select" name="select" id="agencyActivity" onChange={this.handleInput}>
          <option>Please select</option>
          {this.activities()}
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(agencyActivity);
