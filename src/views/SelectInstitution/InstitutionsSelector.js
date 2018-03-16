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
  Button
} from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import getInstitutions from '../Actions/InstitutionsAjax.js';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';

class Institutions extends Component {
  constructor(props) {
    super(props);
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
          <Button color="info">Add Institution</Button>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(Institutions);
