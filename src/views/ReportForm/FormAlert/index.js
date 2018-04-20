import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';


class FormAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Alert color="danger" isOpen={this.props.isOpen} >
        {this.props.message}
      </Alert>
    );
  }
}

export default connect(setStates)(FormAlert);
