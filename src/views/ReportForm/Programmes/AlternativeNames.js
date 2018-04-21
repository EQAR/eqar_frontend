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
import { addEmptyAlterName, addAlterName, removeName, addFirstAlterName } from './actions';


class AlternativeNames extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createNameCard = this.createNameCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getButton = this.getButton.bind(this);
  }

  handleClick() {
    addEmptyAlterName(this.props.programme.alternative_names);
  }

  handleInput(indexOfInput, e) {
    addAlterName(e.target.value, e.target.id, indexOfInput, this.props.programme.alternative_names);
  }

  handleInput(indexOfInput, e) {
    addAlterName(e.target.value, e.target.id, indexOfInput, this.props.programme.alternative_names);
  }

  handleRemove(e) {
    removeName(e.target.id, this.props.programme.alternative_names);
  }

  getButton(index) {
    return index !== 0 ? <Button color="danger" size={'sm'} id={index} onClick={this.handleRemove}>Remove</Button>
    : null;
  }

  createNameCard() {
    return this.props.programme.alternative_names.map((alternative, i) => {
      return (
        <Card key={i}>
          <CardBody>
            <FormGroup>
              <Label for="alternativeName">Altenative Programme Name</Label>
              <Input type="text" name="text" id="name_alternative" placeholder="Enter alternative programme name" onChange={this.handleInput.bind(null, i)} value={alternative.name_alternative}/>
            </FormGroup>
            <FormGroup>
              <Label for="alternativeQualification">Display Text for URL</Label>
              <Input type="text" name="text" id="qualification_alternative" placeholder="Enter alternative qualification name" onChange={this.handleInput.bind(null, i)} value={alternative.qualification_alternative}/>
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
      <Card>
        <CardHeader>
          Alternative Names/Qualifications
        </CardHeader>
        <CardBody>
          {this.createNameCard()}
        </CardBody>
        <CardFooter>
          <Button color="primary" size={'sm'} onClick={this.handleClick}>Add Alternative Name</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default connect(setStates)(AlternativeNames);
