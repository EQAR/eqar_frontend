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
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';
import store from '../../../main_store';
import setStates from '../../../state';
import { connect } from 'react-redux';
import { addProgrammeToReport } from '../actions/reportFormActions';
import ProgrammeName from './ProgrammeName';
import Qualification from './Qualification';
import AlternativeNames from './AlternativeNames';
import Identifiers from './Identifiers';
import QFEHEALevel from './QFEHEALevel';
import NQFLevel from './NQFLevel';
import Countries from './Countries';


class Programmes extends Component {
  constructor(props) {
    super(props)
    this.saveChanges = this.saveChanges.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addProgramme = this.addProgramme.bind(this);
    this.programmesOfReport = this.programmesOfReport.bind(this);
    this.selectedCountry = this.selectedCountry.bind(this);
    this.state = {
      value: [],
      country: [],
      primaryName: '',
      NQFLevel: '',
      QFEHEALevel: ''
    }
  }

  saveChanges(value) {
    let countries = this.props.reportForm.programmes.countries ? this.props.reportForm.programmes.countries : [];
    countries.push(value)
    this.setState({value: value, country: countries});
  }

  handleInput(event) {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    })
  }

  addProgramme(event) {
    addProgrammeToReport(this.state, event.target.id, this.props.reportForm.programmes);
  }

  getCountries() {
    return this.props.countries.countries.map((country) => {
      return {
        value: country.id,
        label: country.name_english
      }
    });
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
          <td>{ programme.primaryName }</td>
          <td>{ programme.NQFLevel }</td>
          <td>{ programme.QFEHEALevel }</td>
          <td>{ this.selectedCountry(programme.country) }</td>
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
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Primary Name</th>
                      <th>NQF</th>
                      <th>QF EHEA</th>
                      <th>Countries</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    { addedProgrammes }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(Programmes);
