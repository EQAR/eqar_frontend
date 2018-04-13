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


class Identifiers extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createNameCard = this.createNameCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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

  createNameCard() {
    return this.props.programme.identifiers.map((identifier, i) => {
      return (
        <Card key={i}>
          <CardHeader>
            Identifiers
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="identifier">Identifier</Label>
              <Input type="text" name="text" id="identifier" placeholder="Enter identifier" onChange={this.handleInput.bind(null, i)} value={identifier.identifier}/>
            </FormGroup>
            <FormGroup>
              <Label for="source">Identifier Source</Label>
              <Input type="text" name="text" id="source" placeholder="Enter source of identifier" onChange={this.handleInput.bind(null, i)} value={identifier.source}/>
            </FormGroup>
          </CardBody>
          <CardFooter>
              <Button color="primary" id={i} onClick={this.handleRemove}>Remove</Button>
          </CardFooter>
        </Card>
      )
    })
  }

  render() {
    return (
      <div>
        {this.createNameCard()}
        <Button color="primary" onClick={this.handleClick}>Add Identifier</Button>
      </div>
    )
  }
}

export default connect(setStates)(Identifiers);
