import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Button} from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import '../notRegisteredStyle.css';
import '../../UserProfile/userProfile.css'
import { addNewPatient } from '../../../services/UserProfile/UserAction';

const birthDateMask = [
  /[0-9]/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/
];

class NotRegisteredInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      newPatient: {}
    };
  }
  render() {
     return (

         <div className={this.props.classNameProp}>
  <Container className = "informationContainer">
      <Formik
        initialValues={{
          pa_name: '',
          pa_surname: '',
          pa_gender: '',
          pa_birthdate: '',
          pa_weight: '',
          pa_relation: '',
          pa_additional_information: ''
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          pa_name: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          pa_surname: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          pa_gender: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          pa_birthdate: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          pa_relation: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          pa_additional_information: Yup.string()
            .required('Doldurulması Zorunlu Alan'),
          pa_weight: Yup.number()
            .typeError('Kilo bir sayı olmalıdır.')
            .required('Doldurulması Zorunlu Alan')
            .positive()
        })}
        onSubmit={fields => {
          const newPatientData = fields;
          this.props.patientData(newPatientData);
        }}
        render={({errors, status, touched}) =>(
      <Form>
        <Row>
        <Col md="12">
          <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
             Hasta Bilgileri
          </p>
          <hr />
        </Col>
        <Col md="4">
          <div>
            <Field name="pa_name" type="text" placeholder="Ad" className={'form-control mb-3'+(errors.pa_name && touched.pa_name ? ' is-invalid': '')} />
            <ErrorMessage name="pa_name" component="div" className="invalid-feedback formBox" />
          </div>
          <div>
            <Field name="pa_surname" type="text" placeholder="Soyad" className={'form-control mb-3'+(errors.pa_surname && touched.pa_surname ? ' is-invalid': '')} />
            <ErrorMessage name="pa_surname" component="div" className="invalid-feedback formBox" />
          </div>
          <div>
            <Field name="pa_gender"  defaultValue ="2" component="select" placeholder="Cinsiyet" className={'form-control mb-3'+(errors.pa_gender && touched.pa_gender ? ' is-invalid': '')}>
              <option>Cinsiyet Seçiniz</option>
              <option value="0">Kadın</option>
              <option value="1">Erkek</option>
            </Field>
            <ErrorMessage name="pa_gender" component="div" className="invalid-feedback formBox" />
          </div>
        </Col>
        <Col md="4">
          <div>
            <Field name="pa_birthdate"
               render={({field}) => (
                 <MaskedInput
                 {...field}
                 mask={birthDateMask}
                 id="pa_birthdate"
                 placeholder="Doğum Tarihi"
                 type="text"
                 className={'form-control mb-3'+ (errors.pa_birthdate && touched.pa_birthdate ? 'is-invalid': '')}/>
               )} />
            <ErrorMessage name="pa_birthdate" component="div" className="invalid-feedback formBox" />
          </div>
          <div>
            <Field name="pa_weight" type="text" placeholder="Kilo" className={'form-control mb-3'+(errors.pa_weight && touched.pa_weight ? ' is-invalid': '')} />
            <ErrorMessage name="pa_weight" component="div" className="invalid-feedback formBox" />
          </div>
          <div>
            <Field name="pa_relation" type="text" placeholder="Yakınlık Derecesi" className={'form-control mb-3'+(errors.pa_relation && touched.pa_relation ? ' is-invalid': '')} />
            <ErrorMessage name="pa_relation" component="div" className="invalid-feedback formBox" />
          </div>
        </Col>
        <Col>
          <p style={{fontSize:'12px', fontFamily:'Open sans, serif'}}>
            Hastanızın durumu hakkında açıklayıcı bilgi giriniz. Özel bir durumu (alerjisi vb) varsa belirtiniz.
         </p>
          <div>
            <Field name="pa_additional_information" type="text" placeholder="Hastanın Durumu"  className={'form-control mb-3'+(errors.pa_additional_information && touched.pa_additional_information ? ' is-invalid': '')} />
            <ErrorMessage name="pa_additional_information" component="div" className="invalid-feedback formBox" />
          </div>
          <Button type="submit" className = "float-right orangeButtonUserProfile">Hasta Bilgilerini Kaydet</Button>
          </Col>
        </Row>
      </Form>
    )}
  />
  </Container>
  </div>


 )
  }
    }
    const mapStateToProps = state => ({
      singlePatient: state.makeReservation.singlePatient,
      makeReservation: state.makeReservation,

    })
export default connect(mapStateToProps, {addNewPatient})(NotRegisteredInfo)
