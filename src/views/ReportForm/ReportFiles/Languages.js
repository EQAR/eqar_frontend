import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { fileForm, languagesAjax, addLanguage } from './actions';


class Languages extends Component {
  constructor(props) {
    super(props);
    this.getLanguages = this.getLanguages.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    languagesAjax();
  }

  saveChanges(value) {
    console.l
    addLanguage(value)
    this.setState({value: value});
  }

  getLanguages() {
    return this.props.languages.languages.map((language) => {
      return {
        value: language.id,
        label: language.language_name_en
      }
    });
  }

  render() {
    return (
      <FormGroup>
        <Label for="languages" className="required-input">File Languages</Label>
        <Select
          id="languages"
          name="form-field-name2"
          value={this.state.value}
          options={this.getLanguages()}
          onChange={this.saveChanges}
          multi
        />
      </FormGroup>
    )
  }
}

export default connect(setStates)(Languages);
