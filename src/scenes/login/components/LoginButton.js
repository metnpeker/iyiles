import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginButton extends Component {
  constructor(props){
      super(props)
      this.state = {
          loading: props.auth.loading,
      };
  }
  renderButton() {
    if(this.props.auth.loading){
      return (
        <Button className="orangeButton" disabled>
          <Spinner animation="border"/>
          <span className="sr-only">Loading...</span>
        </Button>
      );
    }else{
      return (
        <Button className="orangeButton" type="submit">
          Devam Et
        </Button>
      )
    }
  }
  render() {
    return (
      <Row style={{textAlign: 'center'}}>
        <Col xs="12" >
          {this.renderButton()}
        </Col>
        <Col xs="12" style={{marginTop: '1em'}} >
          ya da
        </Col>
        <Col xs="12" className="button-col">
          <Button className="loginBtn--facebook">
            <FontAwesomeIcon className="login-arrow" icon={['fab', 'facebook-square']}  size="lg" style={{marginRight: '15px'}} />
            Facebook ile Giriş Yap
          </Button>
        </Col>  
{/*
          <Button className="loginBtn--google">
            <FontAwesomeIcon className="login-arrow" icon={['fab', 'google']}  size="lg"  style={{marginRight: '15px'}}/>
            Google ile Giriş Yap
          </Button>
        </Col>
        <Col xs="12" className="button-col" >
          <Button variant="link" className="notRegisterButton">Üye Olmadan Devam Et</Button>
        </Col>*/}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(LoginButton)
