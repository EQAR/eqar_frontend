import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label} from 'reactstrap';


export class CustomInputField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormGroup>
        <Label for={this.props.id} className={this.props.labelClassName}>{this.props.labelText}</Label>
        <Input
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          onChange={this.props.handleInput}
          value={this.props.value}
          placeholder={this.props.placeholder} />
      </FormGroup>
    )
  }
}
