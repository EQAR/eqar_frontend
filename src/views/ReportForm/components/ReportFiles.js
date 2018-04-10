import React, { Component } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button } from 'reactstrap';
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';
import store from '../../../main_store';
import setStates from '../../../state';
import { connect } from 'react-redux';


class ReportFiles extends Component {
  constructor(props) {
    super(props)
    this.saveChanges = this.saveChanges.bind(this);

    this.state = {
      value: []
    }
  }

  saveChanges(value) {
    this.setState({ value });
  }

  getCountries() {
    return this.props.countries.countries.map((country) => {
      return {
        value: country.id,
        label: country.name_english
      }
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="fileName">File name</Label>
              <Input type="text" name="text" id="fileName" />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="uploadedFile">File</Label>
              <Input type="file" name="file" id="uploadedFile" />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="fileUrl">File link</Label>
              <Input type="text" name="text" id="fileUrl" />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="fileLanguages">Languages</Label>
                <Select
                  name="form-field-name2"
                  value={this.state.value}
                  options={this.getCountries()}
                  onChange={this.saveChanges}
                  id="fileLanguages"
                  multi
                />
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(ReportFiles);
