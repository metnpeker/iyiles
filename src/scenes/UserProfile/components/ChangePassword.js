import React from 'react';
import { Col, Card, Button, Alert} from 'react-bootstrap';
import {connect} from 'react-redux'
import '../userProfile.css';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { updatePassword } from '../../../services/UserProfile/UserAction.js';

class ChangePassword extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     password: '',
     password_confirmation: ''
   };
   this.handleSubmit = this.handleSubmit.bind(this)
 }
  handleSubmit(e) {
    e.preventDefault();
    const field = {
       password: e.target.password.value,
       password_confirmation: e.target.password_confirmation.value,
    }
    const {password, password_confirmation } = this.state;
    if (password !== password_confirmation) {
        alert("Passwords don't match");
    } else if(password == password_confirmation) {
        this.props.updatePassword(field);
    }
}
  render(){
    return (
      <Card.Body>
      <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold', textDecoration : "underline"}}>
      Şifre Değiştir
      </p>
      <Formik
        initialValues={{
          currentPassword:'',
          password:'',
          password_confirmation:'',
        }}
        validationSchema={Yup.object().shape({
            currentPassword: Yup.string()
                .required('Doldurulması Zorunlu Alan'),
            password: Yup.string()
                .min(6, 'Şifre en az 6 karakter olmalıdır.')
                .required('Doldurulması Zorunlu Alan'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor.')
                .required('Doldurulması Zorunlu Alan')
        })}

      //  onSubmit={fields => {
          //const userNewPassword= fields;
          //this.props.changePassword(userNewPassword);
      //  }}

        render={({errors, status, touched}) => (
          <Form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <Col xs="12" sm="4" className="form-group "  controlId="sifre">
                <Field name="currentPassword" type="password" placeholder="Mevcut Şifre" className={'form-control' + (errors.currentPassword && touched.currentPassword ? ' is-invalid' : '')} />
                <ErrorMessage name="currentPassword" component="div" className="invalid-feedback" />
              </Col>
              <Col xs="12" sm="4" className="form-group" controlId="yeni-sifre">
                 <Field name="password" type="password" placeholder="Yeni Şifre" className={'form-control formBox' + (errors.password && touched.password ? ' is-invalid' : '')} />
                 <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </Col>
              <Col xs="12" sm="4" className="form-group" as = {Col} controlId="sifre-tekrar">
                <Field name="password_confirmation" type="Password" placeholder="Yeni Şifre Tekrar" className={'form-control formBox' + (errors.password_confirmation && touched.password_confirmation ? ' is-invalid' : '')} />
                <ErrorMessage name="password_confirmation" component="div" className="invalid-feedback" />
              </Col>
            </div>
            <Button type="submit"  className="float-right orangeButtonUserProfile" >
              Kaydet
            </Button>
          </Form>
        )}
      />


      </Card.Body>
    )
  }
}

const mapStateToProps = state => ({
  changePassword : state.changePassword
 })



export default connect ( mapStateToProps,{updatePassword})(ChangePassword);
