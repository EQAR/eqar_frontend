import React, { Component } from 'react';
import {
  FormGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { removeInstitution } from './actions';

const ACTIVITY_TYPE = {
  'programme': 'data is required on one and only one institution and at least one programme.',
  'joint programme': 'data is required on at least two institutions and at least one programme.',
  'institutional/programme': 'data is required on one and only one institution and at least one programme.',
  'institutional': 'data is required on at least one institution. No programme data should be entered.'
};

class AssignedActivity extends Component {
  constructor(props) {
    super(props);
    this.reportActivities = this.reportActivities.bind(this);
    this.getActivityType = this.getActivityType.bind(this);
  }

  getActivityType() {
    const activity_type = this.props.activities.activities.filter(activity => activity.id.toString() === this.props.reportForm.activity)[0].activity_type;
    const activity_type_message = ACTIVITY_TYPE[activity_type];
    return (<li>{activity_type} {'>'} {activity_type_message}</li>)
  }

  reportActivities() {
    if (this.props.reportForm.activity) {
      return (
        <div>
          <div>
            Assigned activity type:
          </div>
          <ul>
            {this.getActivityType()}
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <FormGroup>
          {this.reportActivities()}
      </FormGroup>
    )
  }
}

export default connect(setStates)(AssignedActivity);
