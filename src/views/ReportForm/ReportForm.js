import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
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
import Programmes from './Programmes';
import ReportFiles from './ReportFiles';
import sendForm from './Actions/sendForm';
import store from '../../main_store';
import setStates from '../../state';
import { connect } from 'react-redux';
import AlertModal from './AlertModal'

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    sendForm(this.props.reportForm);
  }


  isDisabled(){
    const reprtFormState = store.getState().reportForm;
    const disabled =
      reprtFormState.agency === '' ||
      reprtFormState.activity === '' ||
      reprtFormState.local_identifier === '' ||
      reprtFormState.status === '' ||
      reprtFormState.decision === '' ||
      reprtFormState.valid_from === '' ||
      reprtFormState.valid_to === '' ||
      reprtFormState.institutions.length === 0;
    return disabled;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="animated fadeIn">
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
                <Button type="submit" color="primary" disabled={this.isDisabled()}  onClick={this.handleSubmit}>Save Record</Button>
                <AlertModal />
              </CardFooter>
            </CardBody>
          </Card>
      </Form>
    );
  }
}

export default connect(setStates)(ReportForm);
