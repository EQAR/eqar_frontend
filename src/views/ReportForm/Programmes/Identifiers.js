import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Row,
  Col,
  Label, Collapse
} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { addEmptyIdentifier, addIdentifier, removeIdentifier } from './actions';
import lodash from 'lodash';


class Identifiers extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createNameCard = this.createNameCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getButton = this.getButton.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.isIdentifier = this.isIdentifier.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      fadeIn: true,
      timeout: 300
    };
  }

  handleClick() {
    addEmptyIdentifier(this.props.programme.identifiers);
  }

  handleInput(indexOfInput, e) {
    addIdentifier(e.target.value, e.target.id, indexOfInput, this.props.programme.identifiers);
  }

  handleRemove(e) {
    removeIdentifier(e.target.id, this.props.programme.identifiers);
  }

  getButton(index) {
    return index !== 0 ? <Button color="danger" size={'sm'} id={index} onClick={this.handleRemove}>Remove</Button>
    : null;
  }

  getHR() {
    return this.props.programme.identifiers.length > 1 ? <hr/> : null;
  }

  getToggleText() {
    return this.state.collapse ? 'hide' : 'show'
  }

  isIdentifier(index) {
    return lodash.isEmpty(this.props.programme.identifiers[index].identifier);
  }

  isDisabled() {
    return lodash.isEmpty(lodash.last(this.props.programme.identifiers).identifier);
  }

  toggle(e) {
    e.preventDefault();
    this.setState({collapse: !this.state.collapse});
  }

  createNameCard() {
    return this.props.programme.identifiers.map((identifier, i) => {
      return (
        <div key={i}>
          <FormGroup>
            <Label for="identifier">Identifier</Label>
            <Input type="text" name="text" id="identifier" placeholder="Enter identifier" onChange={this.handleInput.bind(null, i)} value={identifier.identifier}/>
          </FormGroup>
          <FormGroup>
            <Label for="source">Identifier source</Label>
            <Input type="text" name="text" id="resource" placeholder="Enter source of identifier" onChange={this.handleInput.bind(null, i)} value={identifier.resource} disabled={this.isIdentifier(i)}/>
          </FormGroup>
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
          Identifiers
          <div className={'pull-right'}>
            (<a href="#" onClick={this.toggle}>{this.getToggleText()}</a>)
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            {this.createNameCard()}
          </CardBody>
        </Collapse>
        <CardFooter>
          <Button color="primary" size={'sm'} onClick={this.handleClick} disabled={this.isDisabled()}>Add more identifier</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default connect(setStates)(Identifiers);
