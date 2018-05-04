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
import MessageModal from './MessageModal'
import store from '../../main_store';
import setStates from '../../state';
import { connect } from 'react-redux';
import lodash from 'lodash';

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.removeEmptyValues = this.removeEmptyValues.bind(this);
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

  removeEmptyValues() {
    if (this.props.reportForm.report_links[0].link === '' && this.props.reportForm.report_links[0].link_display_name === '') {
      lodash.unset(this.props.reportForm.report_links[0], link);
      lodash.unset(this.props.reportForm.report_links[0], link_display_name);
    }
    return this.props.reportForm
  }

  isDisabled(){
    const reprtFormState = store.getState().reportForm;
    const disabled =
      reprtFormState.agency === '' ||
      reprtFormState.activity === '' ||
      reprtFormState.status === '' ||
      reprtFormState.decision === '' ||
      reprtFormState.valid_from === '' ||
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
                <i className="icon-docs"> </i>Create Report
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
            <Row>
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
            </Row>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary" disabled={this.isDisabled()} onClick={this.handleSubmit}>Save Record</Button>
            <MessageModal />
          </CardFooter>
        </Card>
      </Form>
    );
  }
}

export default connect(setStates)(ReportForm);
