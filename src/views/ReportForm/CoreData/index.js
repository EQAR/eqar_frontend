import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label,
  Row,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Col } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import Agency from './Agency';
import AgencyActivity from './AgencyActivity';
import LocalIdentifier from './LocalIdentifier';
import Status from './Status';
import Decision from './Decision';
import ValidFrom from './ValidFrom';
import ValidTo from './ValidTo';
import ReportUrl from './ReportUrl';


class CoreData extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(CoreData);
