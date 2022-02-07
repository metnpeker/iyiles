import React from 'react';
import {connect} from 'react-redux';
import MaskedInput from 'react-text-mask';
import { Container, Col, Row, Button} from 'react-bootstrap';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import '../relativeInfoStyle.css';
import {addRelative} from '../../../services/MakeReservation/MakeReservationAction';
import {verificationCode} from '../../../services/Register/registerAction';

const phoneNumberMask = [
  0,/[0-9]/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/
];
const birthDateMask = [
  /[0-9]/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/
];

class RelativeInfo extends React.Component {
  constructor(props){
   super(props)
   this.state = {
     patientInformation : {},
     addNewRelative : {},
     showInfo: false,
     isGoing: false,
     u_name:''
     };
     this.handleSubmit = this.handleSubmit.bind(this)
     this.activeTab = this.activeTab.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
 }
  handleSubmit(e) {
     e.preventDefault();
      const relativeData= {
        u_name: e.target.u_name.value,
        u_surname: e.target.u_surname.value,
        email: e.target.email.value,
        u_gender: e.target.u_gender.value,
        u_phone: e.target.u_phone.value,
        code: e.target.code.value,
        birthdate: e.target.birthdate.value,
        u_aggrement_status : e.target.u_aggrement_status.value
      }
      if(e.target.code.value === ''){
        this.props.verificationCode(relativeData)
      } else {
        this.props.relativeData(relativeData)
     }
   }

  handleSubmitNewRelative = e => {
     e.preventDefault();
     const newRelativeData = this.state.addNewRelative;

     this.props.addRelative(newRelativeData)
 };

   onChangeHandlerAddRelative = e => {
     const relative = this.state.addNewRelative;
     relative[e.target.name] = e.target.value ;
     this.setState({addNewRelative : relative});
   }

   activeTab(e) {
     this.setState({showInfo : true})
   }


  render() {
    if(this.props.loading){
      return (<div> </div>);
    }
    else {
      return (
        <div className={this.props.classNameProp}>
           <Container className="informationContainer">
             <Row className = "informationDetailRow">
             <Formik
                 initialValues={{
                 u_name: '',
                 u_surname: '',
                 u_gender: '',
                 email: '',
                 u_phone: '',
                 code: '',
                 birthdate: '',
                 u_aggrement_status : false
                 }}
             enableReinitialize
             validationSchema={Yup.object().shape({
                 u_name: Yup.string()
                   .required('Doldurulması Zorunlu Alan'),
                 u_surname: Yup.string()
                   .required('Doldurulması Zorunlu Alan'),
                 u_gender: Yup.string()
                   .required('Doldurulması Zorunlu Alan'),
                 email: Yup.string()
                   .required('Doldurulması Zorunlu Alan'),
                 u_phone: Yup.string()
                   .required('Doldurulması Zorunlu Alan'),
                 code: Yup.string()
                   .required('Doldurulması Zorunlu Alan'),
                 birthdate: Yup.string()
                   .required('Doldurulması Zorunlu Alan'),
                 u_aggrement_status: Yup.string()
                   .required('Devam etmek için sözleşmeyi kabul edin'),
             })}

               render= {({errors, status, touched})=>(
           <Form onSubmit={this.handleSubmit} style = {{width : "100%"}}>
              <Row>
                <Col md={{span:6}}>
                   <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
                      Hasta Yakını Bilgileri
                   </p>
                      <hr />
                      <Row>
                        <Col md={{span:6}}>
                        <div>
                           <Field
                             name = "u_name"
                             type="text"
                             placeholder="Ad"
                             className={'form-control mb-3'+(errors.u_name && touched.u_name ? ' is-invalid': '')} />
                            <ErrorMessage name="u_name" component="div" className="invalid-feedback" />
                        </div>
                         <div>
                            <Field
                             placeholder="Soyad"
                             name = "u_surname"
                             type="text"
                             className={'form-control mb-3'+(errors.u_surname && touched.u_surname ? ' is-invalid': '')} />
                            <ErrorMessage name="u_surname" component="div" className="invalid-feedback" />
                          </div>
                        <div>
                          <Field name="u_gender" defaultValue ="2" component="select" placeholder="Cinsiyet" className={'form-control mb-3'+(errors.u_gender && touched.u_gender ? ' is-invalid': '')}>
                            <option >Cinsiyeti Seçiniz</option>
                            <option value = "0">Kadın</option>
                            <option value = "1">Erkek</option>
                          </Field>
                          <ErrorMessage name="u_gender" component="div" className="invalid-feedback" />
                        </div>
                        </Col>
                        <Col md={{span:6}}>
                        <div>
                           <Field
                             name = "birthdate"
                              render={({field}) => (
                                <MaskedInput
                                {...field}
                             mask={birthDateMask}
                             id="birthdate"
                             type="text"
                             placeholder="Doğum Tarihi"
                             className={'form-control mb-3'+(errors.birthdate && touched.birthdate ? ' is-invalid': '')} />
                             )} />
                          <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
                        </div>
                         <div>
                          <Field
                             placeholder="Email"
                             name = "email"
                             type="email"
                             className={'form-control mb-3' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                           <ErrorMessage name="email" component="div" className="invalid-feedback" />
                          </div>
                          </Col>
                        </Row>
                       </Col>
                   <Col md={{span:6}}>
                      <div>
                      <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
                         Telefon Numarası Doğrula
                      </p>
                         <hr />
                         <Row>
                           <Col md={{span:6}}>
                       <div>
                          <Field name="u_phone"
                            render={({ field }) => (
                             <MaskedInput
                               {...field}
                                 mask={phoneNumberMask}
                                 id="u_phone"
                                 placeholder="Telefon Numarası"
                                 type="text"
                                 className={'form-control mb-3'+ (errors.u_phone && touched.u_phone ? 'is-invalid': '')}/>
                              )}
                           />
                             <ErrorMessage name="u_phone" component="div" className="invalid-feedback" />
                         </div>
                         <input
                         name="u_aggrement_status"
                         type="checkbox"
                         value = {this.state.u_aggrement_status}
                         onChange={this.handleInputChange} />
                         <a style={{fontSize:'15px', fontFamily:'Open sans, sans-serif', color:'#707070', fontWeight:'bold', marginLeft:'2%'}} href="wwww.facebook.com" >
                           Kullanıcı Sözleşmesini
                         </a> <p style={{fontSize:'15px', fontFamily:'Open sans, sans-serif', color:'#707070'}}> kabul ediyorum.</p>
                            <Button type="submit" className="enterButton mb-3" variant="light" onClick={this.activeTab} >Kod Gönder</Button>
                             </Col>
                             <Col md={{span:6}} style = {{visibility:this.state.showInfo ? "visible" : "hidden"}}>
                              <p style={{color : '#707070', fontSize:'12px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
                                 *Telefonunuza SMS ile gelen kodu aşağıya giriniz.
                              </p>
                         <div>
                             <Field
                                type="code"
                                placeholder="Doğrulama Kodu"
                                name="code"
                                className={'form-control mb-3' + (errors.code && touched.code ? ' is-invalid' : '')} />
                             <ErrorMessage name="code" component="div" className="invalid-feedback" />
                          </div>
                             <Button disabled = {!this.state.u_aggrement_status } className = "float-right orangeButtonUserProfile" type = "submit">Devam Et</Button>
                             </Col>
                           </Row>
                         </div>
                      </Col>

                      </Row>
                  </Form>
                 )}
               />
             </Row>
            </Container>
          </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  patientsData : state.makeReservation.singlePatient
  })

export default connect(mapStateToProps, {addRelative, verificationCode})(RelativeInfo)
