import React, { Component } from 'react';
import {connect} from "react-redux";
import setStates from "../../state";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import {Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {csvResultDisplay, csvUnset, csvUpdate} from "./Actions/csvAction";
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import { toast } from 'react-toastify';

import 'ladda/dist/ladda-themeless.min.css';

class CSVGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      response: []
    }
  }

  loadingToggle() {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  }

  componentWillUnmount() {
    csvUnset()
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onRowDataChanged(params) {
    let allColumnIds = [];
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  displayResults(results) {
    this.setState({
      ...this.state,
      response: results.data
    });
    results.data.forEach(function(data, idx) {
      if(data.submission_status === 'success') {
        csvUpdate(idx, data.report);
      } else {
        csvUpdate(idx, "");
      }
    })
  }

  onButtonIngest() {
    this.loadingToggle();
    csvResultDisplay({infoMessage: "Data is being ingested..."});
    axios.post('https://backend.deqar.eu:8000/submissionapi/v1/submit/csv', this.gridApi.getDataAsCsv(), {
      headers: {'Content-Type': 'text/csv'}
    })
    .then(response => {
      this.loadingToggle();
      csvResultDisplay({infoMessage: "Ingest is completed. Click on the rows to see info about the ingest results."});
      toast.success("CSV file is ingested.");
      this.displayResults(response);
    })
    .catch(error => {
      this.loadingToggle();
      toast.error("There was a problem with ingesting.");
    });
  }

  onRowClicked(params) {
    if(this.state.response.length > 0) {
      let response = this.state.response[params.rowIndex];
      if('submitted_report' in response) {
        delete response['submitted_report']
      }
      csvResultDisplay(response);
    }
  }

  setRowClass(params) {
    let response = this.state.response[params.node.rowIndex];
    if(response) {
      switch (response.submission_status) {
        case "success":
          return 'bg-success';
        case "errors":
          return 'bg-danger';
        default:
          return "";
      }
    } else {
      return "";
    }
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
              border: '0px',
              height: '300px'
            }}
          >
            <AgGridReact
              suppressFieldDotNotation={true}
              enableColResize={true}
              enableFilter={true}
              columnDefs={this.props.csvData.columns}
              rowData={this.props.csvData.data}
              onRowDataChanged={this.onRowDataChanged.bind(this)}
              onGridReady={this.onGridReady.bind(this)}
              onCellFocused={this.onRowClicked.bind(this)}
              getRowClass={this.setRowClass.bind(this)}
            >
            </AgGridReact>
          </div>
          </CardBody>
          <CardFooter>
            <LaddaButton
              className="btn btn-primary btn-ladda btn-sm"
              loading={this.state.loading}
              onClick={this.onButtonIngest.bind(this)}
              data-color="blue"
              data-style={EXPAND_RIGHT}>
              Ingest
            </LaddaButton>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default connect(setStates)(CSVGrid);
