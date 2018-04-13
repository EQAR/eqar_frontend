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
import { addEmptyAlterName, addAlterName, removeName } from './actions';


class AlternativeNames extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createNameCard = this.createNameCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleClick() {
    addEmptyAlterName(this.props.programme.alternativeNames);
  }

  handleInput(indexOfInput, e) {
    addAlterName(e.target.value, e.target.id, indexOfInput, this.props.programme.alternativeNames);
  }

  handleRemove(e) {
    removeName(e.target.id, this.props.programme.alternativeNames);
  }

  createNameCard() {
    return this.props.programme.alternativeNames.map((alternative, i) => {
      return (
        <Card key={i}>
          <CardHeader>
            Alternative Names/Qualifications
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="alternativeName">Altenative Programme Name</Label>
              <Input type="text" name="text" id="alternativeName" placeholder="Enter alternative programme name" onChange={this.handleInput.bind(null, i)} value={alternative.alternativeName}/>
            </FormGroup>
            <FormGroup>
              <Label for="alternativeQualification">Display Text for URL</Label>
              <Input type="text" name="text" id="alternativeQualification" placeholder="Enter alternative qualification name" onChange={this.handleInput.bind(null, i)} value={alternative.alternativeQualification}/>
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
        <Button color="primary" onClick={this.handleClick}>Add Alternative Name/Qualification</Button>
      </div>
    )
  }
}

export default connect(setStates)(AlternativeNames);
