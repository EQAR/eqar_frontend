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
        <Input
          type="select"
          name="select"
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.handleInput} >
          <option>Please select</option>
          {this.getOptions()}
        </Input>
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
    console.log(this.props.valueArray);
    return this.props.valueArray.map((e, index) => {
      return (
        <div key={index}>
          {e.map((elem, i) => {
            return (
              <CustomInputField
                key={i}
                labelText={elem.labelText}
                type={elem.type}
                id={elem.id}
                name={elem.name}
                handleInput={elem.handleInput.bind(null, index)}
                value={elem.value}
                placeholder={elem.placeholder}
              />
            )
          })}
          {this.getButton(index)}
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
          <Button color="primary" size={'sm'} onClick={ this.props.handleClick }>{ this.props.addNewItemText }</Button>
        </CardFooter>
      </Card>
    )
  }
}
