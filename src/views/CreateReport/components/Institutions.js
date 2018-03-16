import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Table,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import getInstitutions from '../Actions/InstitutionsAjax.js';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import SelectTable from './SelectTable'

class Institutions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.clearInstitutions = this.clearInstitutions.bind(this);
  }

  componentWillMount() {
    getInstitutions();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  clearInstitutions() {
    this.props.reportForm.institutions = [];
    this.toggle();
  }

  render() {
    let institutions = this.props.reportForm.institutions;
    institutions = institutions.map(institution => {
      return (
        <tr key={institution.id}>
          <td>{institution.id}</td>
          <td>{institution.eter_id}</td>
          <td>{institution.name}</td>
          <td>{institution.countries}</td>
        </tr>
      )
    });
    return (
      <div>
        <Row>
            <Table bordered striped responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ETER Id</th>
                  <th>Institutions</th>
                  <th>Countries</th>
                </tr>
              </thead>
              <tbody>
                {institutions}
              </tbody>
            </Table>
        </Row>
        <Row>
          <Button color="primary" onClick={this.toggle}>Add Institution</Button>
          <Modal size="xl" isOpen={this.state.modal} fade={false} toggle={this.toggle} className="my-modal">
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              <SelectTable />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Add Institutions</Button>{' '}
              <Button color="secondary" onClick={this.clearInstitutions}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(Institutions);
