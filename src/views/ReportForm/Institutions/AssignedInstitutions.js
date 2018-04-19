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
import { removeInstitution } from './actions';


class AssignedInstitutions extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.reportInstitutions = this.reportInstitutions.bind(this);
  }

  handleRemove(e) {
    removeInstitution(e.target.id, this.props.reportForm.institutions);
  }

  reportInstitutions() {
    return this.props.reportForm.institutions.map((institution, i) => {
      return(
        <ListGroupItem key={i} className="justify-content-between">
              {institution.name_primary}{' '}
              <Button color="danger" id={i} onClick={this.handleRemove} size={'sm'} className="float-right">Remove</Button>
        </ListGroupItem>
      )
    })
  }

  render() {
    return (
      <FormGroup>
        <ListGroup>
          {this.reportInstitutions()}
        </ListGroup>
      </FormGroup>
    )
  }
}

export default connect(setStates)(AssignedInstitutions);
