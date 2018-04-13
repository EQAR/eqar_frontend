import React, { Component } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Button} from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import Autosuggest from 'react-autosuggest';
import { formFill } from '../Actions/reportFormActions';
import { getInstitutions } from './actions';


class Institution extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.state = {
      value: {}
    }
  }

  handleChange(newValue) {
    getInstitutions(newValue);
    this.setState({
      value: newValue
    });
  }

  getOptions() {
    return this.props.institutions.institutions.map(institution => {
      return {
        value: institution,
        label: institution.name_primary
      }
    })
  }

  render() {
    const options = this.getOptions();

    return (
      <FormGroup>
        <Label for="institution" className="required-input">Institution</Label>
          <Select
            id="institution"
            placeholder="Enter institution informations"
            name="form-field-name"
            value={this.state.value}
            options={options}
            onInputChange={this.handleChange}
            onChange={this.handleChange}
          />
          <Button color="primary" onClick={this.handleClick}>Add</Button>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Institution);
