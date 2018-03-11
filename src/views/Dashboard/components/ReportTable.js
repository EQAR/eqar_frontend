import React, { Component } from 'react';
import { Row,
         Col,
         Card,
         CardBody,
         CardHeader,
         ButtonGroup,
         Table,
         Badge
} from 'reactstrap';
import { connect } from 'react-redux';
import store from '../../../main_store';
import setStates from '../../../state';
import getReport from '../Actions/ReportAjax';

class ReportTable extends Component {
  constructor(props) {
    super(props);
    getReport();
  }

  render() {
    // let reportRows =
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-docs"></i>
                Latest Reports
              </CardHeader>
              <CardBody className="pb-0">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Agency</th>
                      <th>Report Name</th>
                      <th>Institutions</th>
                      <th>Programmes</th>
                      <th>Flag</th>
                      <th>Date Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>177</td>
                      <td>ACQUIN</td>
                      <td>Programme accreditation in Germany (ACQUIN)</td>
                      <td>Fulda University of Applied Sciences</td>
                      <td>MA in Polotology</td>
                      <td>
                        <Badge color="warning" pill>Low level</Badge>
                      </td>
                      <td>2018-04-31</td>
                    </tr>
                    <tr>
                      <td>178</td>
                      <td>ACQUIN</td>
                      <td>Programme accreditation in Austria (ACQUIN)</td>
                      <td>University of Vienna</td>
                      <td>MA in Economics</td>
                      <td>
                        <Badge color="success" pill>None</Badge>
                      </td>
                      <td>2018-04-31</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(setStates)(ReportTable);
