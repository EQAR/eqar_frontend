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
import InstitutionsTable from '../../../components/InstitutionsTable';
import Institution from './Institution';
import AssignedInstitutions from './AssignedInstitutions';
import BrowseInstitution from './BrowseInstitution'


class ReportInstitutions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.clearInstitutions = this.clearInstitutions.bind(this);
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
          <Col xs="6">
            <Card>
              <CardBody>
                <Institution />
                <BrowseInstitution />
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card className="info-box">
              <CardBody>
                <AssignedInstitutions />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(ReportInstitutions);
