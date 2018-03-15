import React, { Component } from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import getInstitutions from '../Actions/InstitutionsAjax.js';

class Institutions extends Component {
  constructor(props) {
    super(props);
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    getInstitutions();
  }

  render() {
    return (
      <BootstrapTable version="4" striped hover pagination search options={this.options}>
        <TableHeaderColumn dataField="name" dataSort>Institution</TableHeaderColumn>
        <TableHeaderColumn isKey dataField="email">Email</TableHeaderColumn>
        <TableHeaderColumn dataField="age" dataSort>Age</TableHeaderColumn>
        <TableHeaderColumn dataField="city" dataSort>City</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default Institutions;
