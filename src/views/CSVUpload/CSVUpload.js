import React, { Component } from 'react';
import {connect} from "react-redux";
import setStates from "../../state";
import FileUpload from "./FileUpload";
import CSVGrid from "./CSVGrid";

class CSVUpload extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const displayed = this.props.csvData.data.length > 0;
    const csvGrid = displayed ? (<CSVGrid />) : "";

    return (
      <div className="animated fadeIn">
        <FileUpload />
        {csvGrid}
      </div>
    );
  }
}

export default connect(setStates)(CSVUpload);