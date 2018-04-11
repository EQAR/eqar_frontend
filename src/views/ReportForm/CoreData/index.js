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
import { formFill } from '../actions/reportFormActions';

class CoreData extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id)
  }

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
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input type="select" name="select" id="status" onChange={this.handleInput}>
                    <option>Please Select</option>
                    <option>part of obligatory EQA system</option>
                    <option>voluntary</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="decision">Decision</Label>
                  <Input type="select" name="select" id="decision" onChange={this.handleInput}>
                    <option>Please Select</option>
                    <option>positive</option>
                    <option>positive with conditions or restrictions</option>
                    <option>negative</option>
                    <option>not applicable</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="reportValidFrom">Report valid from</Label>
                  <Input type="date" name="date" id="reportValidFrom" placeholder="Enter the report local identifier" onChange={this.handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="reportValidTo">Report valid to</Label>
                  <Input type="date" name="date" id="reportValidTo" placeholder="Enter the report local identifier" onChange={this.handleInput} />
                </FormGroup>
                <Card>
                  <CardHeader>
                    View Report on Agency Website
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label for="urlToReport">URL to Page</Label>
                      <Input type="text" name="text" id="urlToReport" placeholder="Enter URL to page of report"/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="textOfUrl">Display Text for URL</Label>
                      <Input type="text" name="text" id="textOfUrl" placeholder="Enter display text for URL"/>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Row>
                      <Col>
                        <Button color="primary">Add More</Button>
                      </Col>
                      <Col>
                        <Button color="primary" className="float-right">Remove</Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
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
