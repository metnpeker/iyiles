import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import '../LoginStyle.css';
import { Button, Col, InputGroup, Row, Alert, FormControl, Container} from 'react-bootstrap';
import { loginUser } from '../../../services/Login/LoginAction';
import LoginButton from './LoginButton';


class Login extends Component {
  constructor(props){
      super(props)
      this.state = {
          loading: props.auth.loading,
      };
  }
  /*onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,      FORMIK handles the onSubmit and onChange Functions
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }*/

  failAlert() {
    if(this.props.auth.fail){
      return (
          <Alert color="danger">
            Kullanıcı adı veya şifre hatalı.
          </Alert>
      );
    }
  }

  redirectLogin() {
    if(this.props.auth.isAuthenticated && this.props.auth.userRole==="client"){
       return <Redirect to='/providers' />;
    }else if(this.props.auth.isAuthenticated && this.props.auth.userRole==="provider"){
      return <Redirect to='/business/home' />;
    }
  }


  render() {
    return (
            <div style = {{marginTop : "50px", width : "100%" }}>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required('Doldurulması Zorunlu Alan')
            .email('Email geçersiz.'),
            password: Yup.string()
            .required('Doldurulması Zorunlu Alan')

        })}
        onSubmit={fields => { //fields return {name: value, ...}  this is the parameter we'll send to post request
          //const userData= fields; if you wish you can assign fields to another constant
          this.props.loginUser(fields);
        }}
        render={({errors, status, touched})=>(
          <Form>

          {this.failAlert()}
          <Col sm="10" className="login-col">
            <InputGroup className="mb-3" >
            <Field name="email" type="text" placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </InputGroup>
            <InputGroup className="mb-3">
            <Field name="password" type="password" placeholder="Şifre" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </InputGroup>
             <Link to={'/emailConfirmed'}>
            <Button variant="link">Şifrenizi mi Unuttunuz?</Button>
            </Link>
              </Col>

        <LoginButton />
        {this.redirectLogin()}
      </Form>
        )}
      />
          </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(Login)
