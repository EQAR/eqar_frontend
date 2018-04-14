import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Input,
  Label,
  Button,
  Table } from 'reactstrap';
import '../../../../scss/vendors/react-select/react-select.scss';
import store from '../../../main_store';
import setStates from '../../../state';
import { connect } from 'react-redux';
import { addProgrammeToReport } from './actions';
import ProgrammeName from './ProgrammeName';
import Qualification from './Qualification';
import AlternativeNames from './AlternativeNames';
import Identifiers from './Identifiers';
import QFEHEALevel from './QFEHEALevel';
import NQFLevel from './NQFLevel';
import Countries from './Countries';
import AssignedProgrammes from './AssignedProgrammes';
import AddProgramme from './AddProgramme';


class Programmes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                <ProgrammeName />
                <Qualification />
                <AlternativeNames />
                <Identifiers />
                <QFEHEALevel />
                <NQFLevel />
                <Countries />
              </CardBody>
              <CardFooter>
                <AddProgramme />
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6">
            <Card className="info-box">
              <CardHeader>
                Assigned programmes
              </CardHeader>
              <CardBody>
                <AssignedProgrammes />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(Programmes);
