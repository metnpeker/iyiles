import React from 'react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../../services/UserProfile/UserAction';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import MaskedInput from 'react-text-mask';
import '../userProfile.css';
import { Row, Col, div, Button, Alert} from 'react-bootstrap';

const birthDateMask = [
  /[0-9]/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/
];

const phoneNumberMask = [
  0,/[0-9]/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/
];

class MembershipInformation extends React.Component{

  render () {
    const {user} = this.props.membersData;
    if( !user )
    {
      return <p>loading..</p>;
    } else {

    return(
      <div>
      <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold', textDecoration : "underline"}}>
      Üye Bilgilerini Giriniz
      </p>
     <Formik
      initialValues={{
        u_name: this.props.membersData.user.u_name,
        u_surname: this.props.membersData.user.u_surname,
        email: this.props.membersData.user.email,
        c_gender: this.props.membersData.c_gender,
        birthdate: this.props.membersData.birthdate,
        u_phone: this.props.membersData.user.u_phone
      }}
      validationSchema={Yup.object().shape({
          u_name: Yup.string().required('Doldurulması Zorunlu Alan'),
          u_surname: Yup.string().required('Doldurulması Zorunlu Alan'),
          email: Yup.string().required('Doldurulması Zorunlu Alan').email(),
          c_gender: Yup.string().required('Doldurulması Zorunlu Alan'),
          birthdate: Yup.string().required('Doldurulması Zorunlu Alan'),
          u_phone: Yup.string().required('Doldurulması Zorunlu Alan')
      })}
      onSubmit={fields => { //fields return {name: value, ...}  this is the parameter we'll send to post request
          const newUserData = fields;
          this.props.updateUserInfo(newUserData);
      }}
      render={({errors, touched})=>(

        <Form>
          <Row className="form-row">
            <Col xs="12" sm="6" className="form-col">
            <div className="mb-3 formBox">
                <Field name="u_name" type="text" placeholder="Ad" className={'form-control ' + (errors.u_name && touched.u_name ? ' is-invalid' : '')} />
                <ErrorMessage name="u_name" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col xs="12" sm="6" className="form-col">
            <div  className="mb-3 formBox">
                <Field name="u_surname" type="text" placeholder="Soyad" className={'form-control formBox' + (errors.u_surname && touched.u_surname ? ' is-invalid' : '')} />
                <ErrorMessage name="u_surname" component="div" className="invalid-feedback" />
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" sm="6" className="form-col">
            <div  className=" mb-3 formBox">
                <Field name="email" type="text" placeholder="E-posta" className={'form-control ' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
            </Col>
            <Col xs="12" sm="6" className="form-col formBox">
            <div className="mb-3 formBox">
                <Field name="c_gender" defaultValue ="2" component="select" placeholder="Cinsiyet" className={'form-control'+(errors.c_gender ? ' is-invalid': '')}>
                  <option >Cinsiyeti Seçiniz</option>
                  <option value="0">Kadın</option>
                  <option value="1">Erkek</option>
                </Field>
            <ErrorMessage name="c_gender" component="div" className="invalid-feedback" />
              </div>
            </Col>
          </Row>
          <Row className="form-row">
            <Col xs="12" sm="6" className="form-col">
            <div className=" mb-3 formBox">
                <Field name="birthdate"
                render={({ field }) => (
             <MaskedInput
               {...field}
                 mask={birthDateMask}
                 id="birthdate"
                 placeholder="Doğum Tarihi"
                 type="text"
                 className={'form-control '+ (errors.birthdate && touched.birthdate ? 'is-invalid': '')
           }
         />
       )}
     />
     <ErrorMessage name="birthdate" component="div" className="invalid-feedback"/>
              </div>
            </Col>
            <Col xs="12" sm="6" className="form-col formBox">
            <div className="mb-3" >
                <Field name="u_phone"
                  render={({ field }) => (
                <MaskedInput
                  {...field}
                    mask={phoneNumberMask}
                    id="u_phone"
                    placeholder="Telefon Numarası"
                    type="text"
                    className={'form-control '+ (errors.u_phone && touched.u_phone ? 'is-invalid': '')
              }
            />
          )}
        />
        <ErrorMessage name="u_phone" component="div" className="invalid-feedback"/>
              </div>
            </Col>
          </Row>
            <Button type="submit" className="float-right orangeButtonUserProfile" >
              Kaydet
            </Button>
            {this.props.member.isMemberSuccess ? <Alert  variant="success">Üye bilgileri başarıyla güncellendi</Alert> : null}
             {this.props.member.isMemberFailed ?  <Alert  variant="danger">Üye bilgileri güncellenemedi. Lütfen bilgilerinizi kontrol ediniz. </Alert> : null}
        </Form>
      )}
     />
    </div>
    )
      }
  }
}
const mapStateToProps = state => ({
   auth: state.auth,
   membersData: state.member.membersData,
   userData: state.member.membersData.user,
   member : state.member

 })

export default connect(mapStateToProps, {updateUserInfo })(MembershipInformation)
