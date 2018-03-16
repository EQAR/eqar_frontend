import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label,
  Row,
  Col } from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import { formFill } from '../Actions/reportFormActions';

class ReportBaseData extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    formFill(e.target.value, e.target.id)
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <FormGroup>
              <Label for="localIdentifier">Password</Label>
              <Input type="text" name="text" id="localIdentifier" placeholder="Enter the report local identifier" onChange={this.handleInput}/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="agencyName">Agency</Label>
              <Input type="select" name="select" id="agencyName" onChange={this.handleInput}>
                <option>ACQUIN</option>
                <option>MUSIQUE</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="agencyActivity">Agency ESG Activity (Dependent of Agency)</Label>
              <Input type="select" name="select" id="agencyActivity" onChange={this.handleInput}>
                <option>Please Select</option>
                <option>Programme accreditation in Germany</option>
                <option>Instiutional accreditation in Austria</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="reportTitle">Title of the report (Auto generated)</Label>
              <Input type="text" name="text" id="reportTitle" placeholder="Enter the report local identifier" value="Programme external evaluation/accreditation (First Cycle, Second Cycle) (by ARACIS)" readOnly/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input type="select" name="select" id="status" onChange={this.handleInput}>
                <option>Please Select</option>
                <option>part of obligatory EQA system</option>
                <option>voluntary</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="decision">Decision</Label>
              <Input type="select" name="select" id="decision" onChange={this.handleInput}>
                <option>Please Select</option>
                <option>positive</option>
                <option>positive with conditions or restrictions</option>
                <option>negative</option>
                <option>not applicable</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="reportValidFrom">Report valid from</Label>
              <Input type="date" name="date" id="reportValidFrom" placeholder="Enter the report local identifier" onChange={this.handleInput} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="reportValidTo">Report valid to</Label>
              <Input type="date" name="date" id="reportValidTo" placeholder="Enter the report local identifier" onChange={this.handleInput} />
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(ReportBaseData);
