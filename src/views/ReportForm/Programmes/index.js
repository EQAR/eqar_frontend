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


class Programmes extends Component {
  constructor(props) {
    super(props)
    this.programmesOfReport = this.programmesOfReport.bind(this);
    this.addProgramme = this.addProgramme.bind(this);
  }

  addProgramme(event) {
    addProgrammeToReport(this.props.programme, event.target.id, this.props.reportForm.programmes);
  }

  selectedCountry(countries) {
    return countries.map(country => {
      return country.label;
    })
  }

  programmesOfReport() {
    return this.props.reportForm.programmes.map((programme, i) => {
      return (
        <tr key={i}>
          <td>{ programme.programmeName }</td>
          <td>
            <Button color="primary">Remove</Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const addedProgrammes = this.programmesOfReport();
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
                <Button id="addProgramme" color="primary" onClick={ this.addProgramme }>Add programme ></Button>
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
