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
import { formFill } from '../Actions/reportFormActions';
import { InstitutionSelect } from './actions';


class Institution extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.getInstitutions = this.getInstitutions.bind(this);
    this.state = {
      value: []
    }
  }

  handleInput(e) {
    console.log(e.target)
    InstitutionSelect(e.target.value);
  }

  getInstitutions() {
    return this.props.institutions.institutions.map(institution => {
      return {
        value: {
          id: institution.id,
          primaryName: institution.name_primary
        },
        label: institution.name_primary
      }
    })
  }

  render() {
    return (
      <FormGroup>
        <Label for="institution" className="required-input">Institution</Label>
          <InputGroup>
            <Select
                  name="form-field-name2"
                  value={this.state.value}
                  options={this.getInstitutions()}
                  onChange={this.handleInput}
                />
            <Input type="text" name="text" id="institution" placeholder="Enter institution information" onChange={this.handleInput}/>
            <Button color="primary" onClick={this.handleClick}>Add</Button>
          </InputGroup>
      </FormGroup>
    )
  }
}

export default connect(setStates)(Institution);
