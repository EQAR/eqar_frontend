import React, {Component} from 'react';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import LoginAlert from './LoginAlert';
import { connect } from 'react-redux';
import loginUser from './Actions/LoginAjax';
import setStates from '../../state';
import {Link} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.username;
    this.password;
  }

  setUsername(event) {
    this.username = event.target.value;
  }

  setPassword(event) {
    this.password = event.target.value;
  }

  handleLogin(event) {
    if (event.key !== 'Enter' && event.key !== undefined) {
      return;
    } else {
      loginUser(this.username, this.password);
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <LoginAlert />
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text" placeholder="Username" onKeyUp={this.handleLogin} onChange={this.setUsername} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" placeholder="Password" onKeyUp={this.handleLogin} onChange={this.setPassword} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={this.handleLogin} color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Link to='/forgot-password'>
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Welcome to DEQAR</h2>
                      <p>DEQAR is a database that will enhance access to reports and decisions on higher education institutions/programmes externally reviewed against the ESG, by an EQAR-registered agency.</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(setStates)(Login);
