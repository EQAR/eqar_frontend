import React, { Component } from 'react';
import {
  Row, Button,
  Col, Card, CardHeader, FormGroup, CardBody, Label, Input, CardFooter
} from 'reactstrap';
import {connect} from "react-redux";
import setStates from "../../state";
import {csvSet} from "./Actions/csvAction";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateData(result) {
    if(result.errors.length > 0) {
      console.log(result.errors);
    } else {
      csvSet(this.createColumns(result), result.data);
    }
  }

  createColumns(result) {
    let columns = [];
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
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    let file = this.state.file;

    if(file) {
      console.log(file);

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