import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { InputGroup, Row, Col, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { registerUser, verificationCode } from '../../../services/Register/registerAction';



class RegisterComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: props.auth.loading,
      isGoing: true,
      showInfo: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.activeTab = this.activeTab.bind(this);
  }
  /*onSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    };

  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value}); We don't need on change with formik
  }*/
  failAlert() {
    if(this.props.auth.fail){
      return (
          <Alert color="danger">
            Bu e-mail adresi ile bir üyelik bulunmaktadır.
          </Alert>
      );
    }
  }
  handleInputChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
 }



   activeTab() {
     this.setState({showInfo : true})
   }

   handleSubmit(e){
     e.preventDefault();
     const userData = {
         u_name: e.target.u_name.value,
         u_surname: e.target.u_surname.value,
         email: e.target.email.value,
         u_phone: e.target.u_phone.value,
         password: e.target.password.value,
         code: e.target.code.value,
         u_aggrement_status : e.target.u_aggrement_status.value
     }
     if(e.target.code.value == ''){
       this.props.verificationCode(userData)
     } else {
       this.props.registerUser(userData)
     }
   }

  render() {
    return (
    <div  style = {{marginTop : "50px", width : "100%" }}>
      <Formik
        initialValues={{
          u_name: '',
          u_surname: '',
          email: '',
          u_phone: '',
          password: '',
          code: '',
          u_aggrement_status : false
        }}
        validationSchema={Yup.object().shape({
          u_name: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          u_surname: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          email:  Yup.string()
            .required('Doldurulması Zorunlu Alan')
            .email('Email geçersiz.'),
          password: Yup.string()
            .required('Doldurulması Zorunlu Alan')
            .min(6,'Şifre en az 6 karakter olmalı'),
          u_phone: Yup.string()
            .required('Doldurulması Zorunlu Alan')
            .matches(/(^[0-9]+$)/, 'Geçerli Telefon Numarası Giriniz.'),
          code: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
        })}
        // onSubmit={fields => {
        //
        //    //fields return {name: value, ...}  this is the parameter we'll send to post request
        //   alert('success' + JSON.stringify(fields, null, 4));
        //
        //   const userData= fields;
        //   this.props.verificationCode(userData)
        //
        // }}
        render= {({errors, status, touched})=>(
        <Form onSubmit={this.handleSubmit}>

            <Col sm="8" className="login-col">
              <InputGroup className="mb-3">
                <Field name="u_name" type="text" placeholder="Ad" className={'form-control' + (errors.u_name && touched.u_name ? ' is-invalid' : '')} />
                <ErrorMessage name="u_name" component="div" className="invalid-feedback" />
              </InputGroup>
            <InputGroup className="mb-3">
                <Field name="u_surname" type="text" placeholder="Soyad" className={'form-control' + (errors.u_surname && touched.u_surname ? ' is-invalid' : '')} />
                <ErrorMessage name="u_surname" component="div" className="invalid-feedback" />
            </InputGroup>
            <InputGroup className="mb-3">
                <Field name="email" type="email" placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </InputGroup>
            <InputGroup className="mb-3">
                <Field name="password" type="password" placeholder="Şifre Belirleyin" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </InputGroup>
              <InputGroup>
                 <Field className="mb-3"
              placeholder="Telefon Numarası"
              type="u_phone"
              name = "u_phone"
              className={'form-control' + (errors.u_phone && touched.u_phone ? ' is-invalid' : '')} />
                 <ErrorMessage name="u_phone" component="div" className="invalid-feedback" />
              </InputGroup>
              <Button className="orangeButton" type= "submit"  onClick = {this.activeTab} >
                Devam Et
              </Button>
                <div style = {{visibility:this.state.showInfo ? "visible" : "hidden"}}>
                   <p style={{marginTop: '5%', color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
                      Telefon Numarası Doğrula
                   </p>
                     <hr />
              {/*  <Button className="orangeButton" type="submit"  > Kod Gönder </Button> */}
          <p style={{color : '#707070', fontSize:'12px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold', marginTop:'5%'}}>
               *Telefonunuza SMS ile gelen kodu aşağıya giriniz.
          </p>
                      <InputGroup style={{marginBottom:'8%'}}>
                        <Field className="mb-3"
                     type="code"
                     placeholder="Doğrulama Kodu"
                     name="code"
                     className={'form-control' + (errors.code && touched.code ? ' is-invalid' : '')}
                     />
                     <ErrorMessage name="code" component="div" className="invalid-feedback" />
                     </InputGroup>
                  <input
                  name="u_aggrement_status"
                  type="checkbox"
                  value = {this.state.u_aggrement_status}
                  onChange={this.handleInputChange} />
                   <a href="wwww.facebook.com" className='blue-text' >
                     Kullanıcı Sözleşmesini
                   </a> <p> kabul ediyorum.</p>
                   <Col style = {{textAlign :"center"}}>
                   <Button disabled = {!this.state.u_aggrement_status } className="orangeButton"  type="submit" >
                     Kaydol
                   </Button>
                   </Col>
                 </div>
                </Col>

            </Form>
            )}
             />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  registerCode: state.registerCode
})
export default connect(mapStateToProps, {registerUser, verificationCode})( RegisterComponent);
