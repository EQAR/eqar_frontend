import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import ReportForm from '../../views/ReportForm';
import Dashboard from '../../views/Dashboard/';
import Institutions from '../../views/Institutions';
import { connect } from 'react-redux';
import setStates from '../../state';
import MyProfile from "../../views/MyProfile/MyProfile";
import MyAgency from "../../views/MyAgency/MyAgency";
import { ToastContainer } from 'react-toastify';

class Full extends Component {
  render() {
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="app">
        <ToastContainer position="top-right" autoClose={2000} style={containerStyle}/>
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/my-profile" name="My Profile" component={MyProfile}/>
                <Route path="/my-agency" name="My Profile" component={MyAgency}/>
                <Route path="/report-form" name="Report Form" component={ReportForm}/>
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
