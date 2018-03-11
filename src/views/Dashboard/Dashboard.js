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
import store from '../../main_store';
import setStates from '../../state';
import ReportTable from './components/ReportTable';
import getReports from './Actions/ReportAjax';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getReports());
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
                <h4 className="mb-0">{}</h4>
                <p>Reports submitted</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <h4 className="mb-0">28</h4>
                <p>High level flag</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <h4 className="mb-0">23</h4>
                <p>Institutions covered</p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <h4 className="mb-0">76</h4>
                <p>Programmes mentioned</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ReportTable />
      </div>
    )
  }
}

export default connect(setStates)(Dashboard);
