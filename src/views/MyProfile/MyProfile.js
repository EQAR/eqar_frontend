import React, { Component } from 'react';
import {
  Row,
  Col
} from 'reactstrap';
import {connect} from "react-redux";
import setStates from "../../state";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeTokenForm from "./ChangeTokenForm";
import UserProfile from "./UserProfile";
import ChangeEmailForm from "./ChangeEmailForm";

class MyProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={6} xs={12}>
            <UserProfile />
            <ChangeTokenForm />
          </Col>
          <Col md={6} xs={12}>
            <ChangePasswordForm />
            <ChangeEmailForm />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(setStates)(MyProfile);