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
import { openInstitutionForm, resetFields } from '../services/InstitutionForm/actions';


class Institutions extends Component {

  addNewInstitution() {
    resetFields();
    openInstitutionForm({isSelect: false, addNew: true});
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
                  <Button size="sm"
                          color="primary"
                          onClick={this.addNewInstitution}
                          disabled
                          className="float-right add-institution">
                          Add New Institution
                  </Button>
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
