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

class Institutions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount() {
    getInstitutions();
  }

  render() {
    let institutions = this.props.reportForm.institutions;
    let institutionRows = institutions.map(institution => {
      <tr key={institution.id}>
        <td>{institution.id}</td>
        <td>{institution.eter_id}</td>
        <td>{institution.name_primary}</td>
        <td>{institution.countries.country}</td>
      </tr>
    });

    return (
      // <BootstrapTable data={this.getInstitutionsRows()} version="4" striped hover pagination search options={this.options}>
      //   <TableHeaderColumn dataField="id" dataSort>Id</TableHeaderColumn>
      //   <TableHeaderColumn isKey dataField="eter_id">ETER Id</TableHeaderColumn>
      //   <TableHeaderColumn dataField="name" dataSort>Institution</TableHeaderColumn>
      //   <TableHeaderColumn dataField="countries" dataSort>Countries</TableHeaderColumn>
      // </BootstrapTable>
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
                {institutionRows}
              </tbody>
            </Table>
        </Row>
        <Row>
          <Button color="primary" onClick={this.toggle}>Add Institution</Button>
          <Modal size="xl" isOpen={this.state.modal} fade={false} toggle={this.toggle} className="my-modal">
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(Institutions);
