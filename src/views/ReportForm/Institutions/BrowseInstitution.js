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
import InstitutionsTable from '../../../components/InstitutionsTable';


class BrowseInstitution extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false
    };
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick(e) {
    this.setState({
      value: {
        value: [],
        label: ''
      }
    });
    selectInstitution(this.state.value.value, this.props.reportForm.institutions);
  }

  render() {
    return (
      <FormGroup>
        <Button color="primary" onClick={this.toggle}>Browse Institution</Button>
          <Modal size="xl" isOpen={this.state.modal} fade={false} toggle={this.toggle} className="my-modal">
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              <InstitutionsTable tableType="allInstitutions" select="select"/>
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
