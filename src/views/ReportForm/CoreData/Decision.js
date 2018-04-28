import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';
import { getDecisions } from './actions';


class Decision extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.decisions = this.decisions.bind(this);
  }

  componentDidMount() {
    getDecisions();
  }

  handleInput(e) {
    const selectedIndex = e.target.options.selectedIndex;
    const optionKey = e.target.options[selectedIndex].getAttribute('data-key');
    formFill(optionKey, e.target.id);
  }

  decisions() {
    return this.props.decisions.decisions.map(decision => {
      return (
        <option key={decision.id} data-key={decision.id}>{decision.id} - {decision.decision}</option>
      );
    });
  }

  render() {
    return (
      <FormGroup>
        <Label for="decision" className="required-input">Decision</Label>
        <Input type="select" name="select" id="decision" onChange={this.handleInput}>
          <option>Please Select</option>
          {this.decisions()}
        </Input>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Decision);
