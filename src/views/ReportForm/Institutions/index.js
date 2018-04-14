import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';
import Institution from './Institution';
import AssignedInstitutions from './AssignedInstitutions';
import BrowseInstitution from './BrowseInstitution'


class ReportInstitutions extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                <Institution />
                <BrowseInstitution />
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card className="info-box">
              <CardBody>
                <AssignedInstitutions />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ReportInstitutions;
