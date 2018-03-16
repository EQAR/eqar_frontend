import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import getReports from '../Actions/ReportAjax';

import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';

class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getReports();
  }

  onPageChange(page, sizePerPage) {
    const currentIndex = (page - 1) * sizePerPage;
    getReports(sizePerPage, currentIndex);
  }

  render() {
    const fetchInfo = {
        dataTotalSize: this.props.reports.count
    };

    const options = {
        onPageChange: this.onPageChange,
    };

    return (
      <div className="animated">
        <Card>
          <CardBody>
            <BootstrapTable 
              data={this.props.reports.reports} 
              options={ options }
              version="4" striped remote pagination
              fetchInfo={ fetchInfo }>
              <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
              <TableHeaderColumn dataField="agency">Agency</TableHeaderColumn>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="institutions">Institutions</TableHeaderColumn>
              <TableHeaderColumn dataField="programmes">Programmes</TableHeaderColumn>
              <TableHeaderColumn dataField="flag">Flag</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(setStates)(DataTable)