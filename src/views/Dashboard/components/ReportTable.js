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
import getReports from '../Actions/ReportAjax';

class ReportTable extends Component {
  constructor(props) {
    super(props);
  }

  renderInstitutions(institutions) {
    institutions = institutions.map((institute, index) => {
      return (
        <li key={index}>{institute}</li>
      );
    });
    return institutions;
  }

  renderProgrammes(programmes) {
    programmes = programmes.map((programme, index) => {
      return (
        <li key={index}>{programme}</li>
      );
    });
    return programmes;
  }

  renderFlag(flag) {
    let badgeColor = "success";
    if ( flag === "low level" ) {
      badgeColor = "warning";
    } else if ( flag === "high level" ){
      badgeColor = "danger";
    }
    return (
      <Badge color={badgeColor} pill>{flag}</Badge>
    );
  }

  render() {
    let reports = this.props.reports.reports;
    let reportRows = reports.map((report, index) => {
      return (
        <tr key={report.id}>
          <td>{ report.id }</td>
          <td>ACQUIN</td>
          <td>{report.name}</td>
          <td>
            <ul>
              {this.renderInstitutions(report.institutions)}
            </ul>
          </td>
          <td>
            <ul>
              {this.renderProgrammes(report.programmes)}
            </ul>
          </td>
          <td>
            {this.renderFlag(report.flag)}
          </td>
          <td>{report.date}</td>
        </tr>
      );
    });

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
                    {reportRows}
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
