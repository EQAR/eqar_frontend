import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../main_store';
import setStates from '../../state';
import { toggleAlert } from './Actions/alertActions';
import lodash from 'lodash';


class AlertModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.getMessages = this.getMessages.bind(this);
    // this.mapErrorMessage = this.mapErrorMessage.bind(this);
    this.concatErrors = this.concatErrors.bind(this);
    this.errors = []
  }

  concatErrors(error) {
    this.errors.push(error)
    console.log(this.errors);
    return error;
  }

  // mapErrorMessage(obj, callback, index=0) {
  //   if (lodash.isArray(obj)) {
  //     return obj.map(innerObj => this.mapErrorMessage(innerObj, callback));
  //   } else if (lodash.isObject(obj)) {
  //     return lodash.mapValues(obj, val => this.mapErrorMessage(val, callback));
  //   } else {
  //     return callback(obj);
  // }

  getMessages() {
    let errorMessages = [];
    if (this.props.alert.errorMessage.report_links){
      errorMessages = errorMessages.concat(this.props.alert.errorMessage.report_links.map((linkError, i) => {
        return {inputField: 'Report Link ' + i, errorMessages: linkError}
      }));
    }
    return 'errorMessages';
  }

  toggle() {
    toggleAlert()
  }

  render() {
    return (
      <Modal size="xl" isOpen={this.props.alert.alertDisplay} toggle={this.toggle} className="my-modal">
        <ModalHeader toggle={this.toggle}>Error!</ModalHeader>
        <ModalBody>
          {this.getMessages()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default connect(setStates)(AlertModal);
