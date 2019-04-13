import React, { Component } from 'react';
import { Button, Form, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Alert } from 'reactstrap';
import axios from 'axios';
import { login, resetPassword } from '../../../helpers/auth'
import { firebaseAuth } from '../../../config/constants'
import { serverIp } from '../../../config/connections.js'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loginMessage: null, email: '', pw: '' };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        firebaseAuth().app.auth().currentUser.getToken();
         firebaseAuth().app.auth().currentUser.getToken().then((token)=>{ 
             axios.get( serverIp + 'api/dashboard',{
               params: {
                 userToken: token
               }
             })
           .then(function (response) {
             console.log(response.data);
           })
           .catch(function (error) {
             console.log(error);
           });
         })
    
        this.props.history.push('/');
      } else {
      }
    });
  }
  componentWillUnmount () {
    this.removeListener()
  }

  handleSubmit = (e) => {
    console.log("Submit!");
    e.preventDefault()
    login(this.state.email, this.state.pw)
      .catch((error) => {
        console.log(error);
        this.setState(setErrorMsg('Invalid username/password.'))
      });
  }
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.email}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({pw: event.target.value});
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
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Form onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" className="input" placeholder="Username" value={this.state.email} onChange={this.handleChangeEmail}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" value={this.state.pw} onChange={this.handleChangePassword} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button type="submit" color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                    </Form> 
                    <Row style={{paddingTop: 30}}>
                      <Col xs="12">
                      {
                            this.state.loginMessage &&
                            <Alert color="danger">
                              {this.state.loginMessage}
                            </Alert>
                      }
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
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

export default Login;
