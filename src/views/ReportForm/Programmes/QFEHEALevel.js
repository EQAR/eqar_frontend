import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { programmeForm, getQFEHEA } from './actions';


class QFEHEALevel extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.qfeheaLevels = this.qfeheaLevels.bind(this);
  }

  componentDidMount() {
    getQFEHEA();
  }

  handleInput(e) {
    programmeForm(e.target.value, e.target.id);
  }

  qfeheaLevels() {
    return this.props.qfeheaLevels.levels.map(level => {
      return (
        <option key={level.code}>{level.level}</option>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <Label for="qfeheaLevel">QF-EHEA Level</Label>
        <Input type="select" name="select" id="qfeheaLevel" onChange={ this.handleInput } >
          <option>Please select</option>
          {this.qfeheaLevels()}
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(QFEHEALevel);
