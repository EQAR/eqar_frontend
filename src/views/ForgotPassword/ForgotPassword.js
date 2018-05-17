import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { Form, Text } from 'react-form';
import setStates from '../../state';
import {Link} from "react-router-dom";
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import {POST_PASSWORD_RESET} from "../../config";
import axios from "axios/index";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alertOpen: false,
      successOpen: false,
    }
  }

  loadingToggle() {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  }

  alertToggle() {
    this.setState({
      ...this.state,
      alertOpen: true,
      successOpen: false
    })
  }

  successToggle() {
    this.setState({
      ...this.state,
      successOpen: true,
      alertOpen: false
    })
  }

  closeAlerts() {
    this.setState({
      ...this.state,
      alertOpen: false,
      successOpen: false
    })
  }

  validate(value) {
    const validator = require("email-validator");
    if(!validator.validate(value)) {
      return "E-mail should be properly formatted."
    }
  }

  handleSubmit(value, e, formApi) {
    this.loadingToggle();
    axios.post(POST_PASSWORD_RESET, value)
      .then( response => {
        this.loadingToggle();
        formApi.resetAll();
        this.successToggle();
      })
      .catch( error => {
        this.loadingToggle();
        this.alertToggle();
      });
  }

  checkSubmitState(formState) {
    if(formState.errors || Object.keys(formState.touched).length === 0) {
      return true;
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Forgot Password</h1>
                    <p className="text-muted">Please enter your registered e-mail address.</p>
                    <Alert color="success" isOpen={this.state.successOpen} toggle={this.closeAlerts.bind(this)}>
                      Password reset instructions were sent to your submitted email address!
                    </Alert>
                    <Alert color="danger" isOpen={this.state.alertOpen} toggle={this.closeAlerts.bind(this)}>
                      The given e-mail address is not registered in DEQAR!
                    </Alert>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      {formApi => (
                        <form onSubmit={formApi.submitForm} id="changeEmailForm">
                          <InputGroup className="mb-3">
                            <InputGroupAddon><i className="icon-envelope"></i></InputGroupAddon>
                            <Text
                              field="email"
                              id="email"
                              validate={this.validate}
                              className="form-control"
                              placeholder="E-mail address"/>
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <LaddaButton
                                className="btn btn-primary btn-ladda"
                                loading={this.state.loading}
                                data-color="blue"
                                disabled={this.checkSubmitState(formApi.getFormState())}
                                data-style={EXPAND_RIGHT}>Request</LaddaButton>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Link to='/login'>
                                <Button color="link" className="px-0">Login</Button>
                              </Link>
                            </Col>
                          </Row>
                        </form>
                      )}
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>DEQAR - Reset your password</h2>
                      <p>By submitting a valid e-mail address a mail will arrive to your mailbox with the details of resetting your password.</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(setStates)(ForgotPassword);
