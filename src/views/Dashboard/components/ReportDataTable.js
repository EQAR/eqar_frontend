import React, {Component} from 'react';
import {Badge, Card, CardHeader, CardBody} from 'reactstrap';
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

  multiFormatter(cell, row) {
    return cell.join('; ');
  }

  flagFormatter(cell, row) {
    let badgeColor = "success";
    if ( cell === "low level" ) {
        badgeColor = "warning";
    } else if ( cell === "high level" ) {
        badgeColor = "danger";
    }
    return (
        <Badge color={badgeColor} pill>{cell}</Badge>
    );    
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
              <TableHeaderColumn isKey dataField="id" dataAlign="center" width='10%'>Report ID</TableHeaderColumn>
              <TableHeaderColumn dataField="agency" dataAlign="center" width='10%'>Agency</TableHeaderColumn>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="institutions" dataFormat={ this.multiFormatter }>Institutions</TableHeaderColumn>
              <TableHeaderColumn dataField="programmes" dataFormat={ this.multiFormatter }>Programmes</TableHeaderColumn>
              <TableHeaderColumn dataField="flag" width='10%' dataAlign="center" dataFormat={ this.flagFormatter }>Flag</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(setStates)(DataTable)