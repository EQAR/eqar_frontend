import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { closeInstitutionForm } from './actions';


class InstitutionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    closeInstitutionForm();
  }

  render() {
    return (
      <Modal size="xl" isOpen={this.props.institutionForm.formDisplay} toggle={this.toggle} className="table-modal" autoFocus={true} >
        <ModalHeader toggle={this.toggle}>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="6">
              <Card className="info-box">
                <CardBody>

                </CardBody>

              </Card>
            </Col>
            <Col xs="6">
              <Card className="info-box">

                <CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    )
  }
}

export default connect(setStates)(InstitutionModal);
