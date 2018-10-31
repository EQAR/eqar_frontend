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
  Collapse} from 'reactstrap';
import Select from 'react-select';



export class CustomInputField extends Component {
  constructor(props) {
    super(props);
  }

  convertValue(value) {
    return value === null ? '' : value;
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
          value={this.convertValue(this.props.value)}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled} />
      </FormGroup>
    )
  }
}

export class CustomSelectInput extends Component {
  constructor(props) {
    super(props);
    this.getOptions = this.getOptions.bind(this);
  }

  getOptions() {
    return this.props.options.map((option, i) => {
      return (
        <option key={i}>{option}</option>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <Label for={this.props.id} className={this.props.labelClassName}>{this.props.labelText}</Label>
        <Select
          name="select"
          id={this.props.id}
          value={this.props.value}
          disabled={this.props.disabled}
          onChange={this.props.handleInput}
          options={this.props.options}
          multi={this.props.multi} />
      </FormGroup>
    )
  }
}

export class CustomDynamicInput extends Component {
  constructor(props) {
    super(props);
    this.getRemoveButton = this.getRemoveButton.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.state = {
      collapse: false,
      fadeIn: true,
      timeout: 300
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.open !== this.state.collapse) {
      this.toggle();
    }
  }

  getRemoveButton(index) {
    return this.props.removeButton &&
           index >= this.props.removeButtonIndex ?
      <Button color="danger" 
              size={'sm'} 
              id={index} 
              onClick={this.props.handleRemove}>Remove</Button> : 
      null;
  }

  getHR() {
    return this.props.valueArray.length > 1 ? <hr/> : null;
  }

  getToggleText() {
    if (this.props.toggleButton){
      return this.state.collapse ? 'hide' : 'show'
    }
  }

  getToggleButton() {
    if (this.props.toggleButton){
      return <Button color="link" onClick={this.toggle} className="link-button">{this.getToggleText()}</Button>
    }
  }

  getAddButton() {
    if (this.props.addNewItemText) {
      return <Button color="primary"
                     size={'sm'}
                     onClick={ this.props.handleClick }
                     disabled={this.props.buttonDisabled}>{ this.props.addNewItemText }</Button>
    }
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  setInitialState() {
    this.setState({collapse: this.props.open})
  }

  createCard() {
    return this.props.valueArray.map((e, index) => {
      return (
        <div key={index}>
          {e.map((elem, i) => {
            return elem.type === 'select' ?
              (
              <CustomSelectInput
                key={i}
                labelText={elem.labelText}
                id={elem.id}
                handleInput={elem.handleInput.bind(null, index)}
                value={elem.value}
                options={elem.options}
                disabled={elem.disabled}
                labelClassName={elem.labelClassName}
                multi={elem.multi}
              />
              ) :
              (
              <CustomInputField
                key={i}
                labelText={elem.labelText}
                type={elem.type}
                id={elem.id}
                name={elem.name}
                handleInput={elem.handleInput.bind(null, index)}
                value={elem.value}
                placeholder={elem.placeholder}
                disabled={elem.disabled}
                labelClassName={elem.labelClassName}
              />
            )
          })}
          {this.getRemoveButton(index)}
          {this.getHR()}
        </div>
      )
    })
  }

  render() {
    return (
      <Card className={'subform'}>
        <CardHeader className={this.props.headerClassName}>
          {this.props.headerName}
          <div className="pull-right">
            {this.getToggleButton()}
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            {this.createCard()}
          </CardBody>
        </Collapse>
        <CardFooter>
          {this.getAddButton()}
        </CardFooter>
      </Card>
    )
  }
}
