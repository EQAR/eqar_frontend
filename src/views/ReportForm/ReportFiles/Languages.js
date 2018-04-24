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
import lodash from 'lodash';


class Languages extends Component {
  constructor(props) {
    super(props);
    this.getLanguages = this.getLanguages.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    languagesAjax();
  }

  saveChanges(values) {
    addLanguage(values);
  }

  getLanguages() {
    return this.props.languages.languages.map((language) => {
      return {
        value: language.iso_639_2,
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
          value={this.props.reportFile.report_language}
          options={this.getLanguages()}
          onChange={this.saveChanges}
          multi
        />
      </FormGroup>
    )
  }
}

export default connect(setStates)(Languages);
