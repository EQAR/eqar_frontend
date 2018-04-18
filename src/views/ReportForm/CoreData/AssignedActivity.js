import React, { Component } from 'react';
import {
  FormGroup,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
  Row} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { removeInstitution } from './actions';


class AssignedActivity extends Component {
  constructor(props) {
    super(props);
    this.reportActivities = this.reportActivities.bind(this);
    this.getActivityType = this.getActivityType.bind(this);
  }

  getActivityType() {
    return this.props.activities.activities.filter(activity => activity.activity === this.props.reportForm.activity)[0].activity_type;
  }

  reportActivities() {
    console.log(this.props.reportForm.activity)
    if (this.props.reportForm.activity) {
      return (
        <div>
          <div>
            Assigned Activity Type:
          </div>
          <ul>
            <li>
              {this.getActivityType()}{' '}({this.props.reportForm.activity})
            </li>
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
