import React from 'react';
import { connect } from 'react-redux';
import { Col, Row,  Card, Button, Alert } from 'react-bootstrap';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';
import { resetPatientInfo, updatePatientInfo, addNewPatient} from '../../../services/UserProfile/UserAction';
import { shape } from 'prop-types';
import '../userProfile.css';

const birthDateMask = [
  /[0-9]/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/
];

class PatientInformation extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      patient: {},
      selectedPatient: this.props.makeReservation.selectedPatient || this.props.member.selectedPatient ,
      isNewFormOpen: false,
      newPatient: {}
    };
    this.props.resetPatientInfo();
    this.selectPatientHandler = this.selectPatientHandler.bind(this);
    this.sendPatientData = this.sendPatientData.bind(this);
  }
  handleSubmit = e => {

    e.preventDefault();
    const newPatientData = this.state.patient;

    this.props.updatePatientInfo(newPatientData);
  };
  selectPatientHandler = e => {

    const val = e.target.value;
    const pdata = Object.assign({}, this.props.patientsData[val]);
    const patient = {patient_id: pdata.pa_id};
    this.setState({
      selectedPatient: true,
      patient: pdata
    },
      () => {if(window.location.hash!=="#/userProfile"){

        this.sendPatientData(patient)
      }else{return null;}}
    );
  }

  sendPatientData(patientData){
    if (typeof this.props.selectedPatient === "function") {
        // safe to use the function
       this.props.selectedPatient(patientData);
    }

}


  onChangeHandler = e => {

    const patient = this.state.patient;
    patient[e.target.name] = e.target.value;
    this.setState({ patient: patient });
  }

  onChangeHandlerAddPatient = e => {

    const patient = this.state.newPatient;
    patient[e.target.name] = e.target.value;
    this.setState({ newPatient: patient });
  }
  handleClick() {
    this.setState({ isNewFormOpen: !this.state.isNewFormOpen },

    );
  }
  sendNewPatientData(){

    if(this.props.member.newPatientId !== null && this.props.member.isPatientSuccess){
      const patient = {patient_id: this.props.member.newPatientId};
        this.sendPatientData(patient);
    }
  }
  render() {
    if (!this.props.patientsData) {
      return <p>loading...</p>
    } else {
      return (
        <div className={this.props.classNameProp}>
          <div className={this.state.isNewFormOpen ? 'newForm ' : ''}>
            <div className="form">
              <select className=" form-control patient-select-dropdown"  value={this.props.patientId} onChange={this.selectPatientHandler.bind(this)}>
                <option value="0" key="0"> Hasta Seçiniz </option>
                 {this.props.patientsData.map((data, id) => {
                  return (<option key={data.pa_id} value={id}> {data.pa_name + ' ' + data.pa_surname} </option>)
                })}
              </select>
            </div>
            <Card.Body>
            {this.props.member.isSuccess ? <Alert  variant="success">Hasta bilgileri başarıyla güncellendi</Alert> : null}
            {this.props.member.isFailed ?  <Alert  variant="danger">Hasta bilgileri güncellenemedi. Lütfen girdiğiniz bilgileri kontrol ediniz. </Alert> : null}
              <p style={{ color: '#707070', fontSize: '15px', fontFamily: 'Open sans, sans-serif', fontWeight: 'Bold', textDecoration: "underline" }}>
                Kayıtlı Hasta Bilgileriniz
              </p>
              <Formik
            initialValues={{
              pa_name: this.state.patient.pa_name,
              pa_surname: this.state.patient.pa_surname,
              pa_gender: this.state.patient.pa_gender,
              pa_birthdate: this.state.patient.pa_birthdate,
              pa_weight: this.state.patient.pa_weight,
              pa_relation: this.state.patient.pa_relation,
              pa_additional_information: this.state.patient.pa_additional_information
            }}
            validationSchema={Yup.object().shape({
              pa_name: Yup.string()
                .required('Doldurulması Zorunlu Alan'),
              pa_surname: Yup.string()
                .required('Doldurulması Zorunlu Alan'),
              pa_gender: Yup.string()
                .required('Doldurulması Zorunlu Alan'),
              pa_birthdate: Yup.string()
                .required('Doldurulması Zorunlu Alan'),
              pa_weight: Yup.number()
                .typeError('Kilo bir sayı olmalıdır.')
                .required('Doldurulması Zorunlu Alan')
                .positive()
            })}




            onSubmit={fields => {
              const newPatientData = {
                patient_id: this.state.patient.pa_id,
                client_id: this.state.patient.client_id,
                pa_additional_information: fields.pa_additional_information ,
                pa_birthdate: fields.pa_birthdate ,
                pa_from: this.state.patient.pa_from,
                pa_gender: fields.pa_gender,
                pa_name: fields.pa_name ,
                pa_relation: fields.pa_relation,
                pa_surname: fields.pa_surname,
                pa_to: this.state.patient.pa_to,
                pa_weight: fields.pa_weight,
                service_id: this.state.patient.service_id
              };
              this.props.updatePatientInfo(newPatientData);
            }}
            enableReinitialize
            isValid
            render={({errors, touched}) =>(
              <Form>
                <Row >
                <Col md="4">
                  <div className="mb-3 formBox">
                    <Field name="pa_name" type="text" placeholder="Ad" className={'form-control'+(errors.pa_name && touched.pa_name ? ' is-invalid': '')} />
                    <ErrorMessage name="pa_name" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_surname" type="text" placeholder="Soyad" className={'form-control'+(errors.pa_surname && touched.pa_surname ? ' is-invalid': '')} />
                    <ErrorMessage name="pa_surname" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_gender" defaultValue= "2" component="select" placeholder="Cinsiyet" className={'form-control'+(errors.pa_gender ? ' is-invalid': '')}>
                      <option>Cinsiyeti Seçiniz</option>
                      <option value="0">Kadın</option>
                      <option value="1">Erkek</option>
                    </Field>
                    <ErrorMessage name="pa_gender" component="div" className="invalid-feedback" />
                  </div>
                </Col>
                <Col md="4">
                <div className="mb-3 formBox">
                <Field  name="pa_birthdate"
                   render={({ field }) => (
                <MaskedInput
                  {...field}
                    mask={birthDateMask}
                    id="pa_birthdate"
                    placeholder="Doğum Tarihi"
                    type="text"
                    className={'form-control '+ (errors.pa_birthdate && touched.pa_birthdate ? 'is-invalid': '')
              }
            />
          )}
        />
        <ErrorMessage name="pa_birthdate" component="div" className="invalid-feedback" />

                </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_weight" type="text" placeholder="Kilo" className={'form-control'+(errors.pa_weight && touched.pa_weight ? ' is-invalid': '')} />
                    <ErrorMessage name="pa_weight" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_relation" type="text" placeholder="Yakınlık Derecesi" className='form-control' />
                  </div>
                </Col>
                <Col>
                  <p style={{fontSize:'12px', fontFamily:'Open sans, serif'}}>
                    Hastanızın durumu hakkında açıklayıcı bilgi giriniz. Özel bir durumu (alerjisi vb) varsa belirtiniz.
                  </p>
                  <div className="mb-3 formBox">
                    <Field name="pa_additional_information" type="text" placeholder="Hastanın Durumu" className='form-control' />
                  </div>
                </Col>
                </Row>
                <Button type="button" onClick={this.handleClick} className="float-right orangeButtonUserProfile" >Yeni Hasta Ekle</Button>
                <Button type="submit" className="float-right orangeButtonUserProfile">Kaydet</Button>
              </Form>
            )}
          />


            </Card.Body>
          </div>
          {/************** EMPTY FORM************ */}
          <Card.Body className={this.state.isNewFormOpen ? ' ' : 'newForm'} >
          {this.props.member.isPatientSuccess ? <Alert  variant="success">Yeni hasta başarıyla eklendi.</Alert> : null}
          {this.props.member.isPatientFailed ?  <Alert  variant="danger">Yeni hasta eklenemedi. Lütfen girdiğiniz bilgileri kontrol ediniz. </Alert> : null}
            <p style={{ color: '#707070', fontSize: '15px', fontFamily: 'Open sans, sans-serif', fontWeight: 'Bold', textDecoration: "underline" }}>
              Yeni Hastanızın Bilgilerini Giriniz
            </p>
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
              pa_weight: Yup.number()
                .typeError('Kilo bir sayı olmalıdır.')
                .required('Doldurulması Zorunlu Alan')
                .positive()
            })}
            onSubmit={fields => {

              const newPatientData = fields;
              this.props.addNewPatient(newPatientData);
              if(window.location.hash!=="#/userProfile"){
                this.sendPatientData(newPatientData);
              }else{
                return null;
              }
            }}
            render={({errors, status, touched}) =>(
              <Form>
                <Row >
                <Col md="4">
                  <div className="mb-3 formBox">
                    <Field name="pa_name" type="text" placeholder="Ad" className={'form-control'+(errors.pa_name && touched.pa_name ? ' is-invalid': '')} />
                    <ErrorMessage name="pa_name" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_surname" type="text" placeholder="Soyad" className={'form-control'+(errors.pa_surname && touched.pa_surname ? ' is-invalid': '')} />
                    <ErrorMessage name="pa_surname" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_gender" component="select" placeholder="Cinsiyet" className={'form-control'+(errors.pa_gender ? ' is-invalid': '')}>
                      <option value="0">Kadın</option>
                      <option value="1">Erkek</option>
                    </Field>
                    <ErrorMessage name="pa_gender" component="div" className="invalid-feedback" />
                  </div>
                </Col>
                <Col md="4">
                  <div className="mb-3 formBox">
                  <Field
            name="pa_birthdate"
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask={birthDateMask}
                id="pa_birthdate"
                placeholder="Doğum Tarihi"
                type="text"
                className={'form-control '+ (errors.pa_birthdate && touched.pa_birthdate ? 'is-invalid': '')}/>
            )}
          />
            <ErrorMessage name="pa_birthdate" component="div" className="invalid-feedback" />

                  </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_weight" type="text" placeholder="Kilo" className={'form-control'+(errors.pa_weight && touched.pa_weight ? ' is-invalid': '')} />
                    <ErrorMessage name="pa_weight" component="div" className="invalid-feedback" />
                  </div>
                  <div className="mb-3 formBox">
                    <Field name="pa_relation" type="text" placeholder="Yakınlık Derecesi" className='form-control' />
                  </div>
                </Col>
                <Col>
                  <p style={{fontSize:'12px', fontFamily:'Open sans, serif'}}>
                  Hastanızın durumu hakkında açıklayıcı bilgi giriniz. Özel bir durumu (alerjisi vb) varsa belirtiniz.
                  </p>
                  <div className="mb-3 formBox">
                    <Field name="pa_additional_information" type="text" placeholder="Hastanın Durumu" className='form-control' />
                  </div>
                  {this.message}
                </Col>
                </Row>
                <Button type = "button" onClick = {this.handleClick} className = "float-right orangeButtonUserProfile" >Kapat</Button>
                <Button type="submit" className = "float-right orangeButtonUserProfile">Hasta Ekle</Button>

                {this.sendNewPatientData()}
              </Form>
            )}
          />
          </Card.Body>

        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  patientsData: state.member.membersData.patient,
  singlePatient: state.makeReservation.singlePatient,
  makeReservation: state.makeReservation,
  member: state.member
})


export default connect(mapStateToProps, {resetPatientInfo, updatePatientInfo, addNewPatient})(PatientInformation)
