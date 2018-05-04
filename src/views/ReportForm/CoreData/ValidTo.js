import React, { Component } from 'react';
import {
  FormGroup, FormText,
  Input, InputGroup,
  Label
} from 'reactstrap';
// import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import FormAlert from '../FormAlert';


const autoCorrectedDatePipe = createAutoCorrectedDatePipe('yyyy-mm-dd');

class ValidTo extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.state = {
      isAlert: false,
      errorMessage: ','
    }
  }
  handleBlur(e) {
    if (e.target.value < this.props.reportForm.valid_from && e.target.value !== '') {
      formFill('', e.target.id);
      this.setState({
        isAlert: true,
        errorMessage: 'The given date is earlier than the report\'s validation start date!'
      });
    }
  }

  handleInput(e) {
    this.setState({ isAlert: false });
    formFill(e.target.value, e.target.id);
  }

  isDisabled(index) {
    return this.props.reportForm.valid_from === '';
  }

  render() {
    return (
      <FormGroup>
        <Label for="reportValidTo" >Valid to</Label>
        <InputGroup>
          <MaskedInput
            disabled={this.isDisabled()}
            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            id="reportValidTo"
            onChange={this.handleInput}
            value={this.props.reportForm.valid_to}
            className="form-control"
            pipe={autoCorrectedDatePipe}
            keepCharPositions="true"
            placeholder="yyyy-mm-dd"
            onBlur={this.handleBlur}
          />
        </InputGroup>
        <FormText color="muted">ex. 2018-01-25</FormText>
        <FormAlert isOpen={this.state.isAlert} alertMessage={this.state.errorMessage}/>
      </FormGroup>
    )
  }
}

export default connect(setStates)(ValidTo);
