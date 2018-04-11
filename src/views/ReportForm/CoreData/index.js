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
                <Status />
                <Decision />
                <ValidFrom />
                <ValidTo />
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
