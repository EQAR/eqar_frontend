import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { programmeForm, addCountry } from './actions';
import countriesAjax from '../../../components/InstitutionsTable/Actions/countriesAjax.js';



class Countries extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    countriesAjax();
  }

  handleInput(e) {
    programmeForm(e.target.value, e.target.id);
  }

  saveChanges(value) {
    addCountry(value[0].value, this.props.programme.countries)
    this.setState({value: value});
  }

  getCountries() {
    return this.props.countries.countries.map((country) => {
      return {
        value: country.iso_3166_alpha2,
        label: country.name_english
      }
    });
  }

  render() {
    return (
      <FormGroup>
        <Label for="countries">Countries (if different from institution countries)</Label>
        <Select
          id="countries"
          name="form-field-name2"
          value={this.state.value}
          options={this.getCountries()}
          onChange={this.saveChanges}
          multi
        />
      </FormGroup>
    )
  }
}

export default connect(setStates)(Countries);
