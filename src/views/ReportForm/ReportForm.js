import React, { Component } from 'react';
import {
  Badge,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button } from 'reactstrap';
import classnames from 'classnames';
import CoreData from './CoreData';
import Institutions from './Institutions';
import Programmes from './components/Programmes';
import ReportFiles from './components/ReportFiles';
import countriesAjax from '../../components/InstitutionsTable/Actions/countriesAjax.js';


class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  componentDidMount() {
    countriesAjax();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <i className="icon-docs"></i>
                  Create Report
                </Col>
                <Col xs="auto">
                  <Nav tabs className="float-right">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                      >
                        Core Data
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                      >
                        Institutions
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                      >
                        Programmes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4'); }}
                      >
                        Report Files
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Col>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <CoreData />
                  </TabPane>
                  <TabPane tabId="2">
                    <Institutions />
                  </TabPane>
                  <TabPane tabId="3">
                    <Programmes />
                  </TabPane>
                  <TabPane tabId="4">
                    <ReportFiles />
                  </TabPane>
                </TabContent>
              </Col>
              <CardFooter>
                <Button color="primary">Save Record</Button>
              </CardFooter>
            </CardBody>
          </Card>
      </div>
    );
  }
}

export default ReportForm;
