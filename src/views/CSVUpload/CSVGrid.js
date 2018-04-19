import React, { Component } from 'react';
import {connect} from "react-redux";
import setStates from "../../state";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {csvUnset} from "./Actions/csvAction";


class CSVGrid extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    csvUnset()
  }

  onRowDataChanged(params) {
    let allColumnIds = [];
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Uploaded CSV Data</CardHeader>
          <CardBody className="p-0">
          <div
            className="ag-theme-balham"
            style={{
              width: '100%',
              height: '200px',
              border: '0px'
            }}
          >
            <AgGridReact
              enableColResize={true}
              enableFilter={true}
              columnDefs={this.props.csvData.columns}
              rowData={this.props.csvData.data}
              onRowDataChanged={this.onRowDataChanged.bind(this)}
            >
            </AgGridReact>
          </div>
          </CardBody>
          <CardFooter>
            <Button type="submit" size="sm" color="primary">Ingest</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default connect(setStates)(CSVGrid);
