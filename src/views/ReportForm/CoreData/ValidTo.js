import React, { Component } from 'react';
import {
  FormGroup, FormText,
  Input, InputGroup,
  Label
} from 'reactstrap';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';


class ValidTo extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id)
  }

  render() {
    return (
      <FormGroup>
        <Label for="reportValidTo">Valid from</Label>
        <InputGroup>
          <TextMask
            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            Component={InputAdapter}
            id="reportValidTo"
            onChange={this.handleInput}
            min={this.props.agency.valid_to}
            value={this.props.reportForm.validTo}
            className="form-control"
          />
        </InputGroup>
        <FormText color="muted">ex. 2018-01-25</FormText>
      </FormGroup>
    )
  }
}

export default connect(setStates)(ValidTo);
