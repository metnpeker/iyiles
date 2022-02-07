import React from 'react';
import '../LoginStyle.css'
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Alert,Button,Col,Row,Container} from 'react-bootstrap';
import { passwordReset, changePasswordReady } from '../../../services/ChangePassword/ChangePasswordAction';

class ResetPassword extends React.Component {

constructor(props){
  super(props)
  console.log(props);
  this.props.changePasswordReady()
  this.state = {
      email:'',
      loading: props.changePassword.loading,
      fail: props.changePassword.fail,
      success: props.changePassword.success
    };
  }
  failAlert() {
    if(this.props.changePassword.fail){

        console.log('asdas');
      return (
          <Alert color="danger">
            Mail adresi bulunamadı.
          </Alert>
      );
    }else{

        console.log('qqqqq');
    }
  }
  successAlert() {
    console.log(this.props.changePassword.success);
    if(this.props.changePassword.success){
      console.log('asdas');
      return (
          <Alert color="success">
            Şifre yenileme linki mailinize gönderildi.
          </Alert>
      );
    }else{

        console.log('qqqqq');
    }
  }
   render(){
     return(
       <Formik
         initialValues={{
           email: '',
         }}
         validationSchema={Yup.object().shape({
             email: Yup.string()
               .required('Doldurulması Zorunlu Alan')
               .email('Geçerli bir mail adresi giriniz.'),

         })}
         onSubmit={fields => {
           this.props.passwordReset(fields);
         }}
         render={({errors, status, touched})=>(
           <Form>
            <Container className="form-container" >
              <Row>
               <Col md ={{offset:4, span:4 }} className="passwordBox">
                 {this.failAlert()}
                 {this.successAlert()}
                 <p className="header-style"> Şifre yenileme linki mail adresinize gönderilecektir. </p>
                 <div className="mb-3">
                    <Field name="email" type="text" placeholder="E-mail" className={"form-control" + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                 </div>
                  <Button className="orangeButton" type="submit" > Gönder </Button>
                 </Col>
               </Row>
            </Container>
          </Form>
        )}
      />
     )
   }
}

  const mapStateToProps = state => ({
    auth: state.auth,
    changePassword: state.changePassword
  })

export default connect(mapStateToProps, { passwordReset, changePasswordReady }) (ResetPassword)
