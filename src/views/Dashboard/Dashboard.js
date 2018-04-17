import React, { Component } from 'react';
import { Row,
         Col,
         Card,
         CardBody,
         ButtonGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import setStates from '../../state';
import getBadges from '../Dashboard/Actions/getBadges';
import ReportDataTable from './components/ReportDataTable';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getBadges();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                </ButtonGroup>
                <h4 className="mb-0">{this.props.dashboard.reports_total}</h4>
                <p>Reports submitted</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.props.dashboard.high_level_flags_total}</h4>
                <p>High level flag</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.props.dashboard.institutions_total}</h4>
                <p>Institutions covered</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <h4 className="mb-0">{this.props.dashboard.programmes_total}</h4>
                <p>Programmes mentioned</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ReportDataTable />
      </div>
    )
  }
}

export default connect(setStates)(Dashboard);
