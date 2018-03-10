import React, { Component } from 'react';
import {
  FormGroup,
  Input,
  Label,
  Row,
  Col } from 'reactstrap';

class ReportBaseData extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <FormGroup>
              <Label for="localIdentifier">Password</Label>
              <Input type="text" name="text" id="localIdentifier" placeholder="Enter the report local identifier" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="agencyName">Agency</Label>
              <Input type="select" name="select" id="agencyName">
                <option>ACQUIN</option>
                <option>MUSIQUE</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="agencyActivity">Agency ESG Activity (Dependent of Agency)</Label>
              <Input type="select" name="select" id="agencyActivity">
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
              <Input type="select" name="select" id="status">
                <option>Please Select</option>
                <option>part of obligatory EQA system</option>
                <option>voluntary</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="agencyActivity">Decision</Label>
              <Input type="select" name="select" id="agencyActivity">
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
              <Input type="date" name="date" id="reportValidFrom" placeholder="Enter the report local identifier" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="reportValidTo">Report valid to</Label>
              <Input type="date" name="date" id="reportValidTo" placeholder="Enter the report local identifier" />
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ReportBaseData;
