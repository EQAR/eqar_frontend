import React, { Component } from 'react';
import {
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
import { resetMessage, closeReportForm } from '../Actions/alertActions';
import lodash from 'lodash';


class Message extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  getMessages(){
    if (lodash.isEmpty(this.props.message.warningMessages)) {
      return 'The report was uploaded successfully';
    } else {
      return (
        <ListGroup>
          Warnings!
          {this.props.message.warningMessages.map((warningMessage, i) => {
            return (
              <ListGroupItem key={i}>
                {warningMessage}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      )
    }
  }

  toggle() {
    resetMessage();
    closeReportForm();
  }

  renderMessages() {
    if (this.props.message.warning) {
      return (
        <div className="animated fadeIn">
          <ModalHeader toggle={this.toggle}>Upload finished</ModalHeader>
          <ModalBody>
            {this.getMessages()}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
      </div>
    )
  }
}

export default connect(setStates)(Message);
