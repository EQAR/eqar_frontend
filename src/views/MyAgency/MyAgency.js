import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader} from 'reactstrap';
import {connect} from "react-redux";
import setStates from "../../state";
import {getActivities} from "../ReportForm/CoreData/actions";
import AgencyActivitiesTable from "./AgencyActivitiesTable";

class MyProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getActivities();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>My Agencies</Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <AgencyActivitiesTable />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(setStates)(MyProfile);