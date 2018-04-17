import React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import UserAvatar from 'react-user-avatar';
import {connect} from "react-redux";
import setStates from "../../state";


class UserProfile extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>My Profile</Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <div className="social-box">
                <UserAvatar size="80" name={'('+this.props.dashboard.user.username+')'}/>
                <ul>
                  <li>
                    <strong>{this.props.dashboard.user.username}</strong>
                    <span>user</span>
                  </li>
                  <li>
                    <strong>{this.props.dashboard.user.email}</strong>
                    <span>email</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

export default connect(setStates)(UserProfile);
