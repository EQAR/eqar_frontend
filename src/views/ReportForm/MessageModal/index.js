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
import store from '../../../main_store';
import setStates from '../../../state';
import { toggleAlert } from '../Actions/alertActions';
import lodash from 'lodash';
import 'spinkit/css/spinkit.css';


class MessageModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.mapErrorMessage = this.mapErrorMessage.bind(this);
    this.concatErrors = this.concatErrors.bind(this);
    this.getKey = this.getKey.bind(this);
    this.getHeader = this.getHeader.bind(this);
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
    this.mapErrorMessage(this.props.message.errorMessage, this.concatErrors)
    return (
      <ListGroup>
        {this.errors.map((error, i) => {
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
        })}
      </ListGroup>
    )
  }

  getSpinner() {
    return(
      <div className="sk-wave">
        <div className="sk-rect sk-rect1"></div>&nbsp;
        <div className="sk-rect sk-rect2"></div>&nbsp;
        <div className="sk-rect sk-rect3"></div>&nbsp;
        <div className="sk-rect sk-rect4"></div>&nbsp;
        <div className="sk-rect sk-rect5"></div>
      </div>
    )
  }

  getHeader() {
    if (this.props.message.messageDisplay && this.props.message.spinner) {
      return 'Uploading';
    } else if (this.props.message.messageDisplay) {
      return 'Some error occured!';
    }
  }

  toggle() {
    this.errors = [];
    toggleAlert()
  }

  render() {
    const messages = () => {
      if (this.props.message.messageDisplay && this.props.message.spinner) {
        return this.getSpinner();
      } else if (this.props.message.messageDisplay) {
        return this.getMessages();
      }
    }
    return (
      <Modal isOpen={this.props.message.messageDisplay} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle}>{this.getHeader()}</ModalHeader>
        <ModalBody>
            {messages()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default connect(setStates)(MessageModal);
