import React, { Component } from 'react';
import {
  Button } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addProgrammeToReport, resetProgramme } from './actions';


class AddProgramme extends Component {
  constructor(props) {
    super(props);
    this.addProgramme = this.addProgramme.bind(this);
  }

  addProgramme(event) {
    addProgrammeToReport(this.props.programme, event.target.id, this.props.reportForm.programmes);
    resetProgramme();
  }

  render() {
    return (
      <Button id="addProgramme" color="primary" onClick={ this.addProgramme }>Add programme ></Button>
    )
  }
}

export default connect(setStates)(AddProgramme);
