import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import Message from './Message';


class MessageModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ErrorMessage />
        <Spinner />
        <Message />
      </div>
    )
  }
}

export default connect(setStates)(MessageModal);
