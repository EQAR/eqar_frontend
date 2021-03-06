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
import { addEmptyAlterName, addAlterName, removeName, addFirstAlterName } from './actions';
import lodash from 'lodash';


class AlternativeNames extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.createNameCard = this.createNameCard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.getButton = this.getButton.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.isQualification = this.isQualification.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      fadeIn: true,
      timeout: 300
    };
  }

  handleClick() {
    addEmptyAlterName(this.props.programme.alternative_names);
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

  getHR() {
    return this.props.programme.alternative_names.length > 1 ? <hr/> : null;
  }

  getToggleText() {
    return this.state.collapse ? 'hide' : 'show'
  }

  isQualification(index) {
    return lodash.isEmpty(this.props.programme.alternative_names[index].name_alternative);
  }

  isDisabled() {
    return lodash.isEmpty(lodash.last(this.props.programme.alternative_names).name_alternative);
  }

  toggle(e) {
    this.setState({collapse: !this.state.collapse});
  }

  createNameCard() {
    return this.props.programme.alternative_names.map((alternative, i) => {
      return (
        <div key={i}>
          <FormGroup>
            <Label for="name_alternative">Altenative programme name</Label>
            <Input type="text" name="text" id="name_alternative" placeholder="Enter alternative programme name" onChange={this.handleInput.bind(null, i)} value={alternative.name_alternative}/>
          </FormGroup>
          <FormGroup>
            <Label for="qualification_alternative">Alternative qualification name</Label>
            <Input type="text" name="text" id="qualification_alternative" placeholder="Enter alternative qualification name" onChange={this.handleInput.bind(null, i)} value={alternative.qualification_alternative} disabled={this.isQualification(i)}/>
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
          Alternative Names/Qualifications
          <div className="pull-right">
            (<Button color="link" onClick={this.toggle} className="link-button">{this.getToggleText()}</Button>)
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            {this.createNameCard()}
          </CardBody>
        </Collapse>
        <CardFooter>
          <Button color="primary" size={'sm'} onClick={this.handleClick} disabled={this.isDisabled()}>Add more alternative name</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default connect(setStates)(AlternativeNames);
