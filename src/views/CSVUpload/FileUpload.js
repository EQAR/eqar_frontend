import React, { Component } from 'react';
import {
  Row, Button,
  Col, Card, CardHeader, FormGroup, CardBody, Label, Input, CardFooter
} from 'reactstrap';
import {connect} from "react-redux";
import setStates from "../../state";
import {csvSet, csvUnset} from "./Actions/csvAction";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(result) {
    if(result.errors.length > 0) {
    } else {
      csvSet(this.createColumns(result), this.createData(result.data));
    }
  }

  createData(data) {
    data.forEach(function(value, idx){
      data[idx]['row_number'] = idx + 1;
    });
    return data;
  }

  createColumns(result) {
    let columns = [{
      headerName: 'row',
      field: 'row_number'
    }];
    if(!result.meta.fields.includes('report_id')) {
      columns.push({
        headerName: 'report_id',
        field: 'report_id'
      })
    }
    result.meta.fields.forEach(function(column) {
      columns.push({
        headerName: column,
        field: column,
        editable: true
      })
    });
    return columns;
  }

  onChange(e) {
    this.setState({
      file: e.target.files[0]
    });
    csvUnset();
  }

  onFormSubmit(e) {
    e.preventDefault();
    csvUnset();
    let file = this.state.file;

    if(file) {
      let Papa = require("papaparse/papaparse.min");
      Papa.parse(this.state.file, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: this.updateData
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Upload CSV</CardHeader>
          <form onSubmit={this.onFormSubmit}>
            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="file-input">Select your CSV file</Label>
                    <Input type="file" id="file-input" name="file-input" onChange={this.onChange} />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary">Upload</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }
}

export default connect(setStates)(FileUpload);
