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
} from 'reactstrap';
import { connect } from 'react-redux';
import { Form, Text } from 'react-form';
import setStates from '../../state';
import {Link, Redirect} from "react-router-dom";
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import {POST_PASSWORD_RESET_CONFIRM} from "../../config";
import axios from "axios/index";
import {toast, ToastContainer} from 'react-toastify';


class PasswordResetConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alertOpen: false,
      successOpen: false,
      uid: props.match.params.uid,
      token: props.match.params.token,
      errorMessage: ""
    }
  }

  loadingToggle() {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  }

  handleSubmit(value, e, formApi) {
    this.loadingToggle();
    value['uid'] = this.state.uid;
    value['token'] = this.state.token;
    axios.post(POST_PASSWORD_RESET_CONFIRM, value)
      .then( response => {
        this.loadingToggle();
        formApi.resetAll();
        toast.success("Password has been updated! Redirecting to login...", {
          onClose: () => this.props.history.push('/login')
        });
      })
      .catch( error => {
        if("non_field_errors" in error.response.data) {
          this.setState({
            ...this.state,
            errorMessage: "Password reset link was already used."
          });
        } else {
          this.setState({
            ...this.state,
            errorMessage: error.response.data["new_password"][0]
          });
        }
        this.loadingToggle();
      });
  }

  checkSubmitState(formState) {
    if(formState.errors || Object.keys(formState.touched).length === 0) {
      return true;
    }
  }

  validate(value) {
    let errors = {};

    if(value.new_password !== value.re_new_password) {
      errors.re_new_password = "Passwords do not match!"
    } else {
      errors.re_new_password = null;
    }

    return errors;
  }

  displayError(errors, field) {
    if(errors){
      if(errors[field]){
        return(
          <small className="help-block form-text text-danger mb-3">{errors[field]}</small>
        )
      }
    }
  }

  displayErrorClass(errors, field) {
    let classes = ['form-control'];
    if(errors) {
      if(errors[field]) {
        classes.push('is-invalid')
      }
    }
    return classes.join(' ');
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="app flex-row align-items-center">
        <ToastContainer position="top-right" autoClose={2000} style={containerStyle}/>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Change Password</h1>
                    <p className="text-muted">Please enter your new password!</p>
                    <Form onSubmit={this.handleSubmit.bind(this)} validate={this.validate.bind(this)}>
                      {formApi => (
                        <form onSubmit={formApi.submitForm} id="changeEmailForm">
                          <InputGroup className="mb-3">
                            <InputGroupAddon><i className="icon-lock"> </i></InputGroupAddon>
                            <Text
                              field="new_password"
                              id="new_password"
                              className={this.displayErrorClass(formApi.getFormState().errors, "new_password")}
                              type="password"
                              placeholder="Password"/>
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon><i className="icon-lock"> </i></InputGroupAddon>
                            <Text
                              field="re_new_password"
                              id="re_new_password"
                              className={this.displayErrorClass(formApi.getFormState().errors, "re_new_password")}
                              type="password"
                              placeholder="Retype Password"/>
                          </InputGroup>
                          {this.displayError(formApi.getFormState().errors, 're_new_password')}
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
                      <p>By submitting the form, your password will be changed immediately.</p>
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

export default connect(setStates)(PasswordResetConfirm);
