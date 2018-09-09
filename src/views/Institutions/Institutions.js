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
  onClick(e) {
    console.log(e);
    
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
              <CardFooter>
                <Col>
                  <Button size="sm" color="primary" onClick={this.onClick} className="float-right add-institution" disabled={true}>Add New Institution</Button>
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
