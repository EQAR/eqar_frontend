import React, { Component } from 'react';
import {
  Button } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addProgrammeToReport, resetProgramme } from './actions';
import lodash from 'lodash';


class AddProgramme extends Component {
  constructor(props) {
    super(props);
    this.addProgramme = this.addProgramme.bind(this);
    this.removeEmptyValues = this.removeEmptyValues.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  removeEmptyValues(obj, callback) {
    lodash.forEach(obj, (val, k, obj) => {
      if (val === '') {
        lodash.unset(obj, k);
      }
    })
    return obj;
  }

  addProgramme(event) {
    addProgrammeToReport(this.removeEmptyValues(this.props.programme, this.deleteObject), this.props.reportForm.programmes);
    resetProgramme();
  }

  isDisabled() {
    return this.props.programme.name_primary === '';
  }

  render() {
    return (
      <Button id="addProgramme" size={'sm'} color="primary" onClick={ this.addProgramme } disabled={this.isDisabled()} >Add programme ></Button>
    )
  }
}

export default connect(setStates)(AddProgramme);
