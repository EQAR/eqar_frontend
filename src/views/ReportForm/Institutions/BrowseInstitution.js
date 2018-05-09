import React, { Component } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import InstitutionsReferenceTable from '../../services/InstitutionsReferenceTable';
import { removeSelectedInstitution } from './actions';



class BrowseInstitution extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.clearInstitutions = this.clearInstitutions.bind(this);
    this.getSelectedAmount = this.getSelectedAmount.bind(this);
    this.state = {
      modal: false,
      selectedAmount: 0
    };
  }

  getSelectedAmount() {
    this.setState({
      selectedAmount: this.props.reportForm.institutions.length
    })
    this.toggle();
  }

  clearInstitutions() {
    removeSelectedInstitution(this.state.selectedAmount, this.props.reportForm.institutions);
    this.toggle();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <FormGroup>
        <Button color="primary" size={'sm'} onClick={this.getSelectedAmount}>Browse Institutions</Button>
          <Modal size="xl" isOpen={this.state.modal} fade={false} toggle={this.toggle} className="my-modal">
            <ModalHeader toggle={this.toggle}>Browse Institutions</ModalHeader>
            <ModalBody>
              <InstitutionsReferenceTable isSelect={true}/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Add Institutions</Button>{' '}
              <Button color="secondary" onClick={this.clearInstitutions}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </FormGroup>
    )
  }
}

export default connect(setStates)(BrowseInstitution);
