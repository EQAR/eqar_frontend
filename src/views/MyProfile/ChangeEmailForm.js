import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Label
} from 'reactstrap';
import { Form, Text } from 'react-form';
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import { toast } from 'react-toastify';
import 'ladda/dist/ladda-themeless.min.css';
import axios from "axios/index";
import getUser from "../../components/Header/Actions/getUser";
import { POST_EMAIL } from '../../config';


class ChangeEmailForm extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      loading: false,
    }
  }

  loadingToggle() {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  }

  validateEmail(email) {
    const validator = require("email-validator");
    return validator.validate(email); // true
  }

  validate(value) {
    let errors = {};

    if(value.new_email) {
      if (!this.validateEmail(value.new_email)) {
        errors.new_email = "Email address is not valid"
      } else {
        errors.new_email = null;
      }
    } else {
      errors.new_email = "New Email is mandatory"
    }

    if(value.re_new_email) {
      if(!this.validateEmail(value.re_new_email)) {
        errors.re_new_email = "Email address is not valid"
      } else {
        errors.re_new_email = null;
      }
    } else {
      errors.re_new_email = "Confirm New Email is mandatory"
    }

    if(value.new_email !== value.re_new_email) {
      errors.re_new_email = "Email address does not match!"
    } else {
      errors.re_new_email = null;
    }

    return errors;
  }

  checkSubmitState(formState) {
    if(formState.errors || Object.keys(formState.touched).length === 0) {
      return true;
    }
  }

  displayError(errors, field) {
    if(errors){
      if(errors[field]){
        return(
          <small className="help-block form-text text-danger">{errors[field]}</small>
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

  handleSubmit(value, e, formApi) {
    this.loadingToggle();
    axios.post(POST_EMAIL, value)
    .then( response => {
      this.loadingToggle();
      toast.success("Email has been updated!");
      formApi.resetAll();
      getUser()
    })
    .catch( error => {
      this.loadingToggle();
      toast.error("There was a problem updating your email.");
    });
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>Change Email</Col>
          </Row>
        </CardHeader>
        <Form onSubmit={this.handleSubmit.bind(this)} validate={this.validate.bind(this)}>
          {formApi => (
            <form onSubmit={formApi.submitForm} id="changeEmailForm">
              <CardBody>
                <FormGroup>
                  <Label htmlFor="new_email" className="required-input">New Email</Label>
                  <Text field="new_email" id="newEmail"
                        className={this.displayErrorClass(formApi.getFormState().errors, "new_email")} />
                  {this.displayError(formApi.getFormState().errors, 'new_email')}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="re_new_email" className="required-input">Confirm New Email</Label>
                  <Text field="re_new_email" id="reNewEmail"
                        className={this.displayErrorClass(formApi.getFormState().errors, "re_new_email")} />
                  {this.displayError(formApi.getFormState().errors, 're_new_email')}
                </FormGroup>
              </CardBody>
              <CardFooter>
                <LaddaButton
                  className="btn btn-primary btn-ladda btn-sm"
                  loading={this.state.loading}
                  data-color="blue"
                  disabled={this.checkSubmitState(formApi.getFormState())}
                  data-style={EXPAND_RIGHT}>
                  Submit
                </LaddaButton>
              </CardFooter>
            </form>
          )}
        </Form>
      </Card>
    );
  }
}

export default ChangeEmailForm;
