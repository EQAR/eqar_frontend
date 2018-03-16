import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import CreateReport from '../../views/CreateReport';
import Dashboard from '../../views/Dashboard/';
import Institutions from '../../views/Institutions';
import { connect } from 'react-redux';
import store from '../../main_store';
import setStates from '../../state';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/create-report" name="Create Report" component={CreateReport}/>
                <Route path="/reference-data/institutions" name="Institutions" component={Institutions}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
      </div>
    );
  }
}

export default connect(setStates)(Full);
