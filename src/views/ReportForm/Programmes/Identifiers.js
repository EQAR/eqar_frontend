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
  Label } from 'reactstrap';
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

  isIdentifier(index) {
    return lodash.isEmpty(this.props.programme.identifiers[index].identifier);
  }

  isDisabled() {
    return lodash.isEmpty(lodash.last(this.props.programme.identifiers).identifier);
  }

  createNameCard() {
    return this.props.programme.identifiers.map((identifier, i) => {
      return (
        <Card key={i}>
          <CardBody>
            <FormGroup>
              <Label for="identifier">Identifier</Label>
              <Input type="text" name="text" id="identifier" placeholder="Enter identifier" onChange={this.handleInput.bind(null, i)} value={identifier.identifier}/>
            </FormGroup>
            <FormGroup>
              <Label for="source">Identifier source</Label>
              <Input type="text" name="text" id="resource" placeholder="Enter source of identifier" onChange={this.handleInput.bind(null, i)} value={identifier.resource} disabled={this.isIdentifier(i)}/>
            </FormGroup>
          </CardBody>
          <CardFooter>
            {this.getButton(i)}
          </CardFooter>
        </Card>
      )
    })
  }

  render() {
    return (
      <Card>
        <CardHeader>
          Identifiers
        </CardHeader>
        <CardBody>
          {this.createNameCard()}
        </CardBody>
        <CardFooter>
          <Button color="primary" size={'sm'} onClick={this.handleClick} disabled={this.isDisabled()}>Add more identifier</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default connect(setStates)(Identifiers);
