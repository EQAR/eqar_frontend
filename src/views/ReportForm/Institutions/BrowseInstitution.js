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
import { openInstitutionForm, resetFields } from '../../services/InstitutionForm/actions';
import { removeSelectedInstitution } from './actions';



class BrowseInstitution extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.clearInstitutions = this.clearInstitutions.bind(this);
    this.getSelectedAmount = this.getSelectedAmount.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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

  handleKeyPress(event) {
    if (event.key === 'Escape') {
      this.clearInstitutions();
    } else if (event.target.id !== 'browse' && event.key === 'Enter') {
      this.toggle();
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  addNewInstitution() {
    resetFields();
    openInstitutionForm({isSelect: false, addNew: true});
  }

  render() {
    return (
      <FormGroup>
        <Button id="browse" color="primary" size={'sm'} onClick={this.getSelectedAmount} onKeyUp={this.handleKeyPress}>Browse Institutions</Button>
          <Modal size="xl" isOpen={this.state.modal} fade={false} toggle={this.toggle} className="table-modal" autoFocus={true} onKeyUp={this.handleKeyPress}>
            <ModalHeader toggle={this.toggle}>Browse Institutions</ModalHeader>
            <ModalBody>
              <InstitutionsReferenceTable isSelect={true} toggle={this.toggle.bind(this)}/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addNewInstitution}>Add New</Button>{' '}
            </ModalFooter>
          </Modal>
      </FormGroup>
    )
  }
}

export default connect(setStates)(BrowseInstitution);
