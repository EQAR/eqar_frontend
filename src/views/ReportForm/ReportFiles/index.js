import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  Label,
  Button } from 'reactstrap';
import Select from 'react-select';
import '../../../../scss/vendors/react-select/react-select.scss';
import FileUrl from './FileUrl';
import Upload from './Upload';
import Languages from './Languages';
import FileName from './FileName';
import AddFile from './AddFile';
import AssignedFiles from './AssignedFiles';


class ReportFiles extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                <FileUrl />
                <Upload />
                <Languages />
                <FileName />
              </CardBody>
              <CardFooter>
                <AddFile />
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6">
            <Card className="info-box">
              <CardBody>
                <AssignedFiles />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ReportFiles;
