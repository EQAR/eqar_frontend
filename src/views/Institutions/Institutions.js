import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';
import store from '../../main_store';
import setStates from '../../state';
import InstitutionsTable from '../../components/InstitutionsTable';

class Institutions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-docs"></i>
                Institutions
              </CardHeader>
              <CardBody className="pb-0">
                <InstitutionsTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(Institutions);
