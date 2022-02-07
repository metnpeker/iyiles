import React from 'react';
import '../LoginStyle.css'
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Button,Col,Row,Container} from 'react-bootstrap';
import { passwordChange } from '../../../services/ChangePassword/ChangePasswordAction';

class ResetPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        password:'',
        passwordAgain:'',
        loading: props.auth.loading,
      };
  }

   render(){
     return(
       <Formik
         initialValues={{
           password: '',
           passwordAgain: ''
         }}
         validationSchema={Yup.object().shape({
             password: Yup.string()
             .min(6, 'Şifre en az 6 karakter olmalıdır.')
             .required('Doldurulması Zorunlu Alan'),
             passwordAgain: Yup.string()
             .oneOf([Yup.ref('passwordAgain'), null], 'Şifreler eşleşmiyor.')
             .required('Doldurulması Zorunlu Alan')

         })}
         onSubmit={fields => {

             const data = {
               password: fields.password,
               email: this.props.match.params.email,
               token: this.props.match.params.token
             }
           this.props.passwordChange(data);
         }}
         render={({errors, status, touched})=>(
          <Form>
            <Container className="form-container" >
              <Row>
               <Col md ={{offset:4, span:4 }}className="passwordBox">
                 <div className="mb-3">
                    <Field name="password" type="text" placeholder="Yeni Şifre" className={"form-control" + (errors.password && touched.password ? ' is-invalid' : '')} />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                 </div>
                 <div className="mb-3">
                    <Field name="passwordAgain" type="text" placeholder="Yeni Şifre Tekrar" className={"form-control" + (errors.passwordAgain && touched.passwordAgain ? ' is-invalid' : '')} />
                    <ErrorMessage name="passwordAgain" component="div" className="invalid-feedback" />
                 </div>
                 <Button className="orangeButton" type="submit"> Onayla </Button>
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

export default connect(mapStateToProps, { passwordChange }) (ResetPassword)
