import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../main_store';
import setStates from '../../state';
import loginAlertDisplay from './Actions/LoginAlertDisplay'

class LoginAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  onDismiss() {
    loginAlertDisplay(false);
  }

  render() {
    return (
      <Alert color="danger" isOpen={this.props.login.loginDisplay} toggle={this.onDismiss}>
        The given username and password is not correct!
      </Alert>
    );
  }
}

export default connect(setStates)(LoginAlert);
