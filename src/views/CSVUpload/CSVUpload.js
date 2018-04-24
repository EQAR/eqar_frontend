import React, { Component } from 'react';
import {connect} from "react-redux";
import setStates from "../../state";
import FileUpload from "./FileUpload";
import CSVGrid from "./CSVGrid";
import {Col, Row} from "reactstrap";
import CSVInfo from "./CSVInfo";

class CSVUpload extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const displayed = this.props.csvData.data.length > 0;
    const csvGrid = displayed ? (<CSVGrid />) : "";

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={4} xs={12}>
            <FileUpload />
          </Col>
          <Col md={8} xs={12}>
            <CSVInfo />
          </Col>
        </Row>
        <Row>
          <Col>
            {csvGrid}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(setStates)(CSVUpload);