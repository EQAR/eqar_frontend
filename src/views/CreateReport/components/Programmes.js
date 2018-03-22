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


class Programmes extends Component {
  constructor(props) {
    super(props)
    this.saveChanges = this.saveChanges.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.state = {
      value: [],
      country: [],
      primaryName: '',
      NQFLevel: '',
      QFEHEALevel: ''
    }
  }

  saveChanges(value) {
    const count = this.state.country;
    count.push(value);
    this.setState({value: value, country: count});
  }

  handleInput(event) {
    this.setState({event.target.id: event.target.value})
    console.log(this.state)
  }

  getCountries() {
    return this.props.countries.countries.map((country) => {
      return {
        value: country.id,
        label: country.name_english
      }
    });
  }

  programmesOfReport() {
    return this.props.reportForm.programmes.map(programme => {
      <tr>
        <td>{ programme.primaryName }</td>
        <td>{ programme.NQFLevel }</td>
        <td>{ programme.QFEHEALevel }</td>
        <td>{ programme.country }</td>
        <td>
          <Button color="primary">Remove</Button>
        </td>
      </tr>
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card>
              <CardHeader>
                Add programme
              </CardHeader>
              <CardBody className="pb-0">
                <FormGroup>
                  <Label for="primaryName">Primary name</Label>
                  <Input type="text" name="text" id="primaryName" onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup>
                  <Label for="NQFLevel">NQF Level</Label>
                  <Input type="text" name="text" id="NQFLevel" onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup>
                  <Label for="QFEHEALevel">QF EHEA Level</Label>
                  <Input type="select" name="select" id="QFEHEALevel" onChange={ this.handleInput } >
                    <option>Please select</option>
                    <option>first cycle</option>
                    <option>short cycle</option>
                    <option>second cycle</option>
                    <option>third cycle</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Select
                    name="form-field-name2"
                    value={this.state.value}
                    options={this.getCountries()}
                    onChange={this.saveChanges}
                    multi
                  />
                </FormGroup>
                <CardFooter>
                  <Button color="primary">Add programme ></Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <CardHeader>
                Assigned programmes
              </CardHeader>
              <CardBody className="pb-0">
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
                    { this.programmesOfReport() }
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
