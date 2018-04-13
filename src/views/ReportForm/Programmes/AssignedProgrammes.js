import React, { Component } from 'react';
import {
  FormGroup,
  Button,
  ListGroup,
  ListGroupItem,
  Col,
  Row} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { removeProgramme } from './actions';


class AssignedProgrammes extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.reportProgrammes = this.reportProgrammes.bind(this);
  }

  handleRemove(e) {
    removeProgramme(e.target.id, this.props.reportForm.programmes);
  }

  reportProgrammes() {
    return this.props.reportForm.programmes.map((programme, i) => {
      return(
        <ListGroupItem key={i} className="justify-content-between">
              {programme.programmeName}{' '}
              <Button color="primary" id={i} onClick={this.handleRemove} className="float-right">Remove</Button>
              <Button color="primary" id={i} onClick={this.handEdit} className="float-right programme-edit">Edit</Button>
        </ListGroupItem>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <ListGroup>
          {this.reportProgrammes()}
        </ListGroup>
      </FormGroup>
    )
  }
}

export default connect(setStates)(AssignedProgrammes);
