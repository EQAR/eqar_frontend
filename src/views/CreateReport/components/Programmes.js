import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Button,
  Table } from 'reactstrap';
import Select from 'react-select';
import countries from './data/countries';
import '../../../../scss/vendors/react-select/react-select.scss';

const options = countries;

class Programmes extends Component {
  constructor(props) {
    super(props)
    this.saveChanges = this.saveChanges.bind(this);

    this.state = {
      value: []
    }
  }

  saveChanges(value) {
    this.setState({ value });
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
                  <Input type="text" name="text" id="primaryName" />
                </FormGroup>
                <FormGroup>
                  <Label for="NQFLevel">NQF Level</Label>
                  <Input type="text" name="text" id="NQFLevel" />
                </FormGroup>
                <FormGroup>
                  <Label for="QFEHEALevel">QF EHEA Level</Label>
                  <Input type="select" name="select" id="exampleSelect">
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
                    options={options}
                    onChange={this.saveChanges}
                    multi
                  />
                </FormGroup>
                <FormGroup>
                  <Button color="info">Add programme ></Button>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <CardHeader>
                Assigned programmes
              </CardHeader>
              <CardBody className="pb-0">
                <Table>
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
                    <tr>
                      <td>Programme name</td>
                      <td>ACQUIN</td>
                      <td>third cycle</td>
                      <td>Germany</td>
                      <td>
                        <Button color="info">Remove</Button>
                      </td>
                    </tr>
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

export default Programmes;
