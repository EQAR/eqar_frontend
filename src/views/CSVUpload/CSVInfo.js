import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import setStates from "../../state";


class CSVInfo extends Component {
  constructor(props) {
    super(props);
  }

  // Returns if a value is an object
  isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
  };

  renderIntroMessage() {
    return (
      <div>
        <p className="animated fadeIn">Information about the format and the requirements of the CSV file can be found in the
          CSV Upload section of the <a href="https://docs.deqar.eu/csv_upload/" target="_blank">
            DEQAR Documentation</a>.
        </p>
        <p>To see the submission results:</p>
        <ol>
          <li>Upload a CSV file.</li>
          <li>Make edits in the grid, if needed</li>
          <li>Ingest them to DEQAR</li>
          <li>Check the status of each report by clicking on the row.</li>
        </ol>
      </div>
    )
  }

  renderInfoMessage() {
    return (
      <div>
        <p className="animated fadeIn">{this.props.csvData.errorObject.infoMessage}</p>
      </div>
    )
  }

  renderSuccessInfo() {
    return (
      <dl className="animated fadeIn row">
        <dt className="col-sm-4">Report ID</dt>
        <dd className="col-sm-8">{this.props.csvData.errorObject.report}</dd>
        <dt className="col-sm-4">Submission status</dt>
        <dd className="col-sm-8">{this.props.csvData.errorObject.submission_status}</dd>
        <dt className="col-sm-4">Flags</dt>
        <dd className="col-sm-8">{this.props.csvData.errorObject.report_flag}</dd>
        <dt className="col-sm-4">Report warnings</dt>
        <dd className="col-sm-8">
          {
            this.props.csvData.errorObject.report_warnings.map((warning, index) => (
              <p key={index}>{warning}</p>
            ))
          }
        </dd>
      </dl>
    )
  }

  renderNonFieldErrors() {
    if('non_field_errors' in this.props.csvData.errorObject.errors) {
      return(this.props.csvData.errorObject.errors.non_field_errors.map((error, index) => (
        <p key={index}>{error}</p>
      )))
    }
  }

  renderFieldErrors() {
    const errorObj = this.props.csvData.errorObject.errors;
    let errors = [];
    Object.keys(errorObj).map(function(key, index) {
      if(key !== 'non_field_errors') {
        errorObj[key].forEach(function(value){
          console.log(value);
          if(typeof value === 'object') {
            Object.keys(value).map(function(k, idx) {
              errors.push({field: k, message: value[k]});
            })
          } else {
            errors.push({field: key, message: value});
          }
        });
      }
    });
    return(
        errors.map((error, index) => (
          <div key={index}><i>({error.field})</i> {error.message}<br/></div>
        ))
    )
  }

  renderErrorInfo() {
    return (
      <dl className="animated fadeIn row">
        <dt className="col-sm-4">Report ID</dt>
        <dd className="col-sm-8">{this.props.csvData.errorObject.report ? this.props.csvData.errorObject.report : 'N/A'}</dd>
        <dt className="col-sm-4">Submission status</dt>
        <dd className="col-sm-8">{this.props.csvData.errorObject.submission_status}</dd>
        <dt className="col-sm-4">Errors</dt>
        <dd className="col-sm-8">
          {this.renderNonFieldErrors()}
          {this.renderFieldErrors()}
        </dd>
      </dl>
    )
  }

  renderInfo() {
    if (this.isObject(this.props.csvData.errorObject)) {
      if ('infoMessage' in this.props.csvData.errorObject) {
        return(this.renderInfoMessage());
      } else {
        if(this.props.csvData.errorObject.submission_status === "success") {
          return(this.renderSuccessInfo());
        } else {
          return(this.renderErrorInfo());
        }
      }
    } else {
      return(this.renderIntroMessage());
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>CSV Submission Information</CardHeader>
          <CardBody>
            <Row>
              <Col>
                {this.renderInfo()}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(setStates)(CSVInfo);
