import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button
} from 'reactstrap';
import InstitutionsReferenceTable from '../services/InstitutionsReferenceTable';

class Institutions extends Component {
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
              <CardFooter>
                <Col>
                  <Button color="primary" className="float-right" onClick={this.toggle}>Add Institutions</Button>
                </Col>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Institutions;
