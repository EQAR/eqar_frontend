import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
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
    this.mapErrorMessage = this.mapErrorMessage.bind(this);
    this.concatErrors = this.concatErrors.bind(this);
    this.getKey = this.getKey.bind(this);
    this.errors = []
  }

  concatErrors(error, key) {
    lodash.last(this.errors).message = error;
    return error;
  }

  getKey(key){
    return {
      link: {inputField: 'Report link: '},
      link_display_name: {inputField: 'Report link display name: '},
      resource: {inputField: 'Programme identifier resource: '},
      identifier: {inputField: 'Programme identifier: '},
      qualification_primary: {inputField: 'Qualification: '},
      name_alternative: {inputField: 'Alternative name: '},
      original_location: {inputField: 'File location: '},
      display_name: {inputField: 'File display name: '},
      non_field_errors: {inputField: 'Error: '},
      alternative: {inputField: 'Alternative qualification: '},
      report_files: {inputField: 'Report file:'}
    }[key]
  }

  mapErrorMessage(obj, callback, key) {
    const inputField = this.getKey(key);
    if (inputField) {
      this.errors.push(inputField)
    }
    if (lodash.isArray(obj)) {
      return obj.map(innerObj => this.mapErrorMessage(innerObj, callback));
    } else if (lodash.isObject(obj)) {
      return lodash.forEach(obj, (val, k) => this.mapErrorMessage(val, callback, k));
    } else {
      return callback(obj);
    }
  }

  getMessages() {
    this.mapErrorMessage(this.props.alert.errorMessage, this.concatErrors)
    return this.errors.map((error, i) => {
      return (
        <ListGroupItem key={i}>
          <ListGroupItemHeading>
            {error.inputField}
          </ListGroupItemHeading>
          <ListGroupItemText>
            {error.message}
          </ListGroupItemText>
        </ListGroupItem>
      )
    })
  }

  toggle() {
    this.errors = [];
    toggleAlert()
  }

  render() {
    const messages = () => {
      if (this.props.alert.alertDisplay) {
        return this.getMessages();
      }
    }
    return (
      <Modal isOpen={this.props.alert.alertDisplay} toggle={this.toggle} className="my-modal">
        <ModalHeader toggle={this.toggle}>Error!</ModalHeader>
        <ModalBody>
          <ListGroup>
            {messages()}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default connect(setStates)(AlertModal);
