import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Collapse } from 'reactstrap';


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

export class CustomDynamicInput extends Component {
  constructor(props) {
    super(props);
    this.getButton = this.getButton.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      fadeIn: true,
      timeout: 300
    };
  }

  getButton(index) {
    return index !== 0 ? <Button color="danger" size={'sm'} id={index} onClick={this.props.handleRemove}>Remove</Button>
    : null;
  }

  getHR() {
    return this.props.valueArray.length > 1 ? <hr/> : null;
  }

  getToggleText() {
    return this.state.collapse ? 'hide' : 'show'
  }

  toggle(e) {
    this.setState({collapse: !this.state.collapse});
  }

  createCard() {
    return this.props.valueArray.map((elem, i) => {
      return (
        <div key={i}>
          <CustomInputField
            labelText={this.props.firstLabelText}
            type={this.props.type}
            id={this.props.firstId}
            name={this.props.name}
            handleInput={this.props.handleInput.bind(null, i)}
            value={elem[this.props.firstDisplayValue]}
            placeholder={this.props.firstPlaceholder}
            />
          <CustomInputField
            labelText={this.props.secondLabelText}
            type={this.props.type}
            id={this.props.secondtId}
            name={this.props.name}
            handleInput={this.props.handleInput.bind(null, i)}
            value={elem[this.props.secondDisplayValue]}
            placeholder={this.props.firstPlaceholder}
            disabled={this.props.inputDisabled(i)}
            />
          {this.getButton(i)}
          {this.getHR()}
        </div>
      )
    })
  }

  render() {
    return (
      <Card className={'subform'}>
        <CardHeader>
          {this.props.headerName}
          <div className="pull-right">
            (<Button color="link" onClick={this.toggle} className="link-button">{this.getToggleText()}</Button>)
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            {this.createCard()}
          </CardBody>
        </Collapse>
        <CardFooter>
          <Button color="primary" size={'sm'} onClick={ this.props.handleClick } disabled={this.props.isDisabled()}>{ this.props.addNewItemText }</Button>
        </CardFooter>
      </Card>
    )
  }
}
