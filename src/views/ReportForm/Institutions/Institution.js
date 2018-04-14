import React, { Component } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Button} from 'reactstrap';
import { Async } from 'react-select';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { getInstitutions, selectInstitution } from './actions';
import axios from 'axios';


class Institution extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: {}
    }
  }

  handleSelect(institution) {
    this.setState({
      value: institution
    });
  }

  handleClick(e) {
    this.setState({
      value: {
        value: [],
        label: ''
      }
    });
    selectInstitution(this.state.value.value, this.props.reportForm.institutions);
  }

  getOptions(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return axios.get('https://backend.deqar.eu/adminapi/v1/select/institutions', {params: {query: input}})
    .then((response) => {
      return response.data.results.map(result => {
        return {
          value: result,
          label: result.name_primary
        }
      })
    })
    .then(results => {
      return ({ options: results })
    })
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
        <Button color="primary" onClick={this.handleClick}>Add</Button>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Institution);
