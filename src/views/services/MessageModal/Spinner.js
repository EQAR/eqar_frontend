import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import 'spinkit/css/spinkit.css';


class Spinner extends Component {
  constructor(props) {
    super(props);
    this.getSpinner = this.getSpinner.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
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

  renderSpinner() {
    if (this.props.message.spinner) {
      return (
        <div>
          <ModalHeader>Uploading</ModalHeader>
          <ModalBody>
            {this.getSpinner()}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </div>
      )
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.message.spinner}>
        {this.renderSpinner()}
      </Modal>
    )
  }
}

export default connect(setStates)(Spinner);
