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
import InstitutionsReferenceTable from './InstitutionsReferenceTable';

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
                <i className="icon-graduation"> </i>
                Institutions
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <InstitutionsReferenceTable isSelect={false}/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(Institutions);
