import React, { Component } from 'react';
import {
  FormGroup,
  InputGroup,
  FormText,
  Label} from 'reactstrap';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';
import FormAlert from '../FormAlert';


const autoCorrectedDatePipe = createAutoCorrectedDatePipe('yyyy-mm-dd');

class ValidFrom extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      isAlert: false,
      errorMessage: ','
    }
  }

  handleBlur(e) {
    if (e.target.value < this.props.agency.valid_from && e.target.value !== '') {
      formFill('', e.target.id);
      this.setState({
        isAlert: true,
        errorMessage: 'The given date is earlier than the agency\'s registration date!'
      });
    } else if (e.target.value > this.props.agency.valid_to && e.target.value !== '') {
      formFill('', e.target.id);
      this.setState({
        isAlert: true,
        errorMessage: 'The given date is later than the agency\'s registration end!'
      });
    }
  }

  handleInput(e) {
    this.setState({
      isAlert: false,
      errorMessage: ''
    });
    formFill(e.target.value, e.target.id);
  }

  render() {
    return (
      <FormGroup>
        <Label for="reportValidFrom" className="required-input">Valid from</Label>
        <InputGroup>
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            id="reportValidFrom"
            onChange={this.handleInput}
            value={this.props.reportForm.valid_from}
            className="form-control"
            pipe={autoCorrectedDatePipe}
            keepCharPositions="true"
            placeholder="yyyy-mm-dd"
            onBlur={this.handleBlur}
          />
        </InputGroup>
        <FormText color="muted">ex. 2018-01-15</FormText>
        <FormAlert isOpen={this.state.isAlert} alertMessage={this.state.errorMessage}/>
      </FormGroup>
    )
  }
}

export default connect(setStates)(ValidFrom);
