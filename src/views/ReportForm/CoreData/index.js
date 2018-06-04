import React, { Component } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col } from 'reactstrap';
import Agency from './Agency';
import AgencyActivity from './AgencyActivity';
import LocalIdentifier from './LocalIdentifier';
import Status from './Status';
import Decision from './Decision';
import ValidFrom from './ValidFrom';
import ValidTo from './ValidTo';
import ReportUrl from './ReportUrl';
import AssignedActivity from './AssignedActivity';


class CoreData extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card className="info-box">
              <CardBody>
                <Agency />
                <AgencyActivity />
                <LocalIdentifier />
                <Status />
                <Decision />
                <ValidFrom />
                <ValidTo />
                <ReportUrl />
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card className="info-box">
              <CardBody>
                <AssignedActivity />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default (CoreData);
