import React, { Component } from 'react';
import {
  FormGroup,
  Label} from 'reactstrap';
import { Async } from 'react-select';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { getInstitutions, selectInstitution } from './actions';
import lodash from 'lodash';


class Institution extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.state = {
      value: {}
    }
  }

  handleSelect(institution) {
    this.setState({value: institution}, () => {
      selectInstitution(this.state.value.value, this.props.reportForm.institutions)
      this.setState({
        value: {
          value: {},
          label: ''
        }
      });
    });
  }

  isDisabled() {
    return lodash.isEmpty(this.state.value.value);
  }

  getOptions(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return getInstitutions(input, this.props.reportForm.institutions);
  }

  render() {
    return (
      <FormGroup>
        <Label for="institution" className="required-input">Institution</Label>
        <Async
          id="institution"
          placeholder="Enter institution informations"
          name="form-field-name2"
          value={this.state.value}
          loadOptions={this.getOptions}
          onChange={this.handleSelect}
        />
      </FormGroup>
    )
  }
}

export default connect(setStates)(Institution);
