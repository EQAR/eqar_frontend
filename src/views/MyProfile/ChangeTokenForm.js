import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup, Label
} from 'reactstrap';
import { Form, Text } from 'react-form';
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import { toast } from 'react-toastify';
import 'ladda/dist/ladda-themeless.min.css';
import axios from "axios/index";
import { POST_TOKEN } from '../../config';


class ChangeTokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  getCurrentToken() {
    return {api_token: localStorage.getItem('token')};
  }

  loadingToggle() {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  }

  checkSubmitState(formState) {
    if(formState.errors || Object.keys(formState.touched).length === 0) {
      return true;
    }
  }

  handleSubmit(value, e, formApi) {
    this.loadingToggle();
    axios.post(POST_TOKEN, value)
      .then( response => {
        this.loadingToggle();
        toast.success("Token has been updated!");
        formApi.setValue('api_token', response.data.token);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
      })
      .catch( error => {
        this.loadingToggle();
        toast.error("There was a problem updating your API token.");
      });
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>Change API Token</Col>
          </Row>
        </CardHeader>
        <Form onSubmit={this.handleSubmit.bind(this)} defaultValues={this.getCurrentToken()}>
          {formApi => (
            <form onSubmit={formApi.submitForm} id="changeTokenForm">
              <CardBody>
                <FormGroup>
                  <Label htmlFor="api_token">API Token</Label>
                  <Text field="api_token" id="apiToken" className={'form-control'} readOnly={true}/>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <LaddaButton
                  className="btn btn-primary btn-ladda btn-sm"
                  loading={this.state.loading}
                  data-color="blue"
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

export default ChangeTokenForm;
