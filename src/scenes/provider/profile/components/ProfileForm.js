import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Col, Button, Container, Row, Alert} from 'react-bootstrap';
import {providerProfile, updateProviderProfile} from '../../../../services/provider/ProfilePage/ProfilePageAction'

class ProfileForm extends Component {

  constructor(props){
      super(props)
      this.props.providerProfile();
    }
    componentWillReceiveProps(nextProps){
      if(!nextProps.file){
        return;
      }

      let reader = new FileReader();
        reader.readAsDataURL(nextProps.file);
      reader.onload=e=>{

      }
    }

    alertRender (){
      if(this.props.isProfileUpdateSuccess){
        return(
          <Alert variant="success">
                    <p>
                    Bilgileriniz başarıyla güncellenmiştir.
                    </p>
          </Alert>
        )
      }
    if(this.props.isProfileUpdateFail){
      return(
        <Alert variant="danger">
            <p>
            Bilgileriniz güncellenemedi. Lütfen tekrar deneyiniz.
            </p>
          </Alert>
       )
      }
    }
    render() {
      const {user} = this.props.profileProviderData;
      if(!user ){
        return (<div>loading profile</div>);
      }
      else {
        return (
            <Container className = "profileFormContainer">
            <Formik
             initialValues={{
               u_id: this.props.profileProviderData.user.u_id,
               u_name : this.props.profileProviderData.user.u_name,
               u_surname : this.props.profileProviderData.user.u_surname,
               u_phone : this.props.profileProviderData.user.u_phone,
               pro_email : this.props.profileProviderData.pro_email,
               pro_title : this.props.profileProviderData.pro_title,
               pro_name : this.props.profileProviderData.pro_name,
               pro_tax_office : this.props.profileProviderData.pro_tax_office,
               pro_type: this.props.profileProviderData.pro_type,
               pro_iban : this.props.profileProviderData.pro_iban,
               pro_tax_number : this.props.profileProviderData.pro_tax_number,
               pro_mersis_number : this.props.profileProviderData.pro_mersis_number,
               pro_kep_address : this.props.profileProviderData.pro_kep_address,
               pro_address: this.props.profileProviderData.pro_address,
               pro_phone : this.props.profileProviderData.pro_phone,
               pro_description : this.props.profileProviderData.pro_description,
               wh_start_time : this.props.profileProviderData.working_hour[0].wh_start_time,
               wh_end_time : this.props.profileProviderData.working_hour[0].wh_end_time,
               pro_ambulance_quantity: this.props.profileProviderData.pro_ambulance_quantity,
               pro_short_desc: this.props.profileProviderData.pro_short_desc,
             }}
             validationSchema={Yup.object().shape({
               u_id: Yup.string().required('Doldurulması zorunlu alan'),
               u_name : Yup.string().required('Doldurulması zorunlu alan'),
               u_surname : Yup.string().required('Doldurulması zorunlu alan'),
               u_phone : Yup.string().required('Doldurulması zorunlu alan'),
               pro_email : Yup.string().required('Doldurulması zorunlu alan').email(),
               pro_title : Yup.string().required('Doldurulması zorunlu alan'),
               pro_name : Yup.string().required('Doldurulması zorunlu alan'),
               pro_tax_office : Yup.string().required('Doldurulması zorunlu alan'),
               pro_type: Yup.string().required('Doldurulması zorunlu alan'),
               pro_iban : Yup.string().required('Doldurulması zorunlu alan'),
               pro_tax_number : Yup.string().required('Doldurulması zorunlu alan'),
               pro_mersis_number : Yup.string().required('Doldurulması zorunlu alan'),
               pro_kep_address : Yup.string().required('Doldurulması zorunlu alan'),
               pro_address: Yup.string().required('Doldurulması zorunlu alan'),
               pro_phone : Yup.string().required('Doldurulması zorunlu alan'),
               wh_start_time : Yup.string().required('Doldurulması zorunlu alan'),
               wh_end_time : Yup.string().required('Doldurulması zorunlu alan'),
               pro_description : Yup.string().required('Doldurulması zorunlu alan'),
               pro_ambulance_quantity :  Yup.number().required('Doldurulması zorunlu alan'),
               pro_short_desc :  Yup.string().required('Doldurulması zorunlu alan'),
             })}

            onSubmit={(values)=> {
              values.pro_id = this.props.profileProviderData.pro_id;
              this.props.updateProviderProfile(values);
        }}

             render={({errors, touched, setFieldValue, values})=>(

               <Form>
                 <Row className="form-row">

                   <Col xs="12" sm="6" md ={{offset : 2, span :3}}  className="form-col">
                   <div className="mb-3 formBox">
                       <Field name="u_name" type="text" placeholder="Ad" className={'form-control ' + (errors.u_name && touched.u_name ? ' is-invalid' : '')} />
                       <ErrorMessage name="u_name" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                   <Col xs="12" sm="6"  md ={{offset : 2, span :3}} className="form-col">
                   <div  className="mb-3 formBox">
                       <Field name="u_surname" type="text" placeholder="Soyad" className={'form-control ' + (errors.u_surname && touched.u_surname ? ' is-invalid' : '')} />
                       <ErrorMessage name="u_surname" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" sm="6"  md ={{offset : 2, span :3}} className="form-col">
                   <div  className=" mb-3 formBox">
                       <Field name="pro_email" type="text" placeholder="E-posta" className={'form-control ' + (errors.pro_email && touched.pro_email ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_email" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                   <Col xs="12" sm="6"  md ={{offset : 2, span :3}} className="form-col ">
                   <div className="mb-3 formBox">
                       <Field name="u_phone" type="text" placeholder="Cep Telefonu" className={'form-control ' + (errors.u_phone && touched.u_phone ? ' is-invalid' : '')} />
                       <ErrorMessage name="u_phone" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" sm="6"  md ={{offset : 2, span :3}} className="form-col">
                   <div className=" mb-3 formBox">
                       <Field name="pro_title" type="text" placeholder="Ticari Ünvan" className={'form-control ' + (errors.pro_title && touched.pro_title ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_title" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                   <Col xs="12" sm="6" md ={{offset : 2, span :3}}  className="form-col">
                   <div className="mb-3 formBox" >
                       <Field name="pro_name" type="text" placeholder="Firma Adı" className={'form-control ' + (errors.pro_name && touched.pro_name ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_name" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" sm="6" md ={{offset : 2, span :3}}  className="form-col">
                   <div className=" mb-3 formBox">
                       <Field name="pro_tax_office" type="text" placeholder="Vergi Dairesi" className={'form-control ' + (errors.pro_tax_office && touched.pro_tax_office ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_tax_office" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                   <Col xs="12" sm="6" md ={{offset : 2, span :3}}  className="form-col ">
                   <div className="mb-3 formBox" >
                   <Field name="pro_iban" type="text" placeholder="IBAN" className={'form-control ' + (errors.pro_iban && touched.pro_iban ? ' is-invalid' : '')} />
                   <ErrorMessage name="pro_iban" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" sm="6"  md ={{offset : 2, span :3}} className="form-col">
                   <div className=" mb-3 formBox">
                   <Field name="pro_tax_number" type="text" placeholder="TCKN" className={'form-control ' + (errors.pro_tax_number && touched.pro_tax_number ? ' is-invalid' : '')} />
                   <ErrorMessage name="pro_tax_number" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                   <Col xs="12" sm="6"  md ={{offset : 2, span :3}} className="form-col ">
                   <div className="mb-3 formBox">
                       <Field name="pro_kep_address" type="text" placeholder="Kep Adresi" className={'form-control ' + (errors.pro_kep_address && touched.pro_kep_address ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_kep_address" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" sm="6" md ={{offset : 2, span :3}} className="form-col">
                   <div className=" mb-3 formBox">
                       <Field name="pro_ambulance_quantity" type="text" placeholder="Ambulans Sayısı" className={'form-control ' + (errors.pro_ambulance_quantity && touched.pro_ambulance_quantity ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_ambulance_quantity" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                   <Col xs="12" sm="6" md={{offset : 2, span :3}}  className="form-col">
                   <div className="mb-3 formBox">
                       <Field name="pro_phone" type="text" placeholder="Firma Telefon Numarası" className={'form-control ' + (errors.pro_phone && touched.pro_phone ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_phone" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" sm="6" md= {{offset : 2, span :3}}className="form-col">
                   <div className=" mb-3 formBox">
                   <Field name="wh_start_time" type="text" placeholder="Firma Açılış Saati" className={'form-control ' + (errors.wh_start_time && touched.wh_start_time ? ' is-invalid' : '')} />
                   <ErrorMessage name="wh_start_time" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                   <Col xs="12" sm="6" md = {{offset : 2, span :3}}  className="form-col ">
                   <div className="mb-3 formBox">
                       <Field name="wh_end_time" type="text" placeholder="Firma Kapanış Saati" className={'form-control ' + (errors.wh_end_time && touched.wh_end_time ? ' is-invalid' : '')} />
                       <ErrorMessage name="wh_end_time" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" className="text-center text-warning">
                      <p>**Çalışma Saatleriniz 00.00-00.00 şeklinde girilirse 7/24 olarak yansıtılacaktır.</p>
                   </Col>
                 </Row>
                 <Row className="form-row">
                   <Col xs="12" sm="6" md={{offset : 2, span :8}} className="form-col">
                   <div className=" mb-3 formBox">
                       <Field name="pro_address" type="text" placeholder="Firma Adresi" className={'form-control ' + (errors.pro_address && touched.pro_address ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_address" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                 <Row className="form-row">
                 <Col xs="12" sm="6" md={{offset : 2, span :8}} className="form-col">
                 <div className=" mb-3 formBox">
                     <Field name="pro_short_desc" type="text" placeholder="Firma Hakkında Kısa Bilgi" className={'form-control ' + (errors.pro_short_desc && touched.pro_short_desc ? ' is-invalid' : '')} />
                     <ErrorMessage name="pro_short_desc" component="div" className="invalid-feedback" />
                   </div>
                 </Col>
                   <Col xs="12" sm="6" md={{offset : 2, span :8}} className="form-col">
                   <div className=" mb-3 formBox">
                       <Field name="pro_description" type="text" placeholder="Firma Hakkında Bilgi" className={'form-control ' + (errors.pro_description && touched.pro_description ? ' is-invalid' : '')} />
                       <ErrorMessage name="pro_description" component="div" className="invalid-feedback" />
                     </div>
                   </Col>
                 </Row>
                {this.alertRender()}
                 <Col md = {{offset : 5}}>
                   <Button type="submit" className="orangeButton" >
                     Güncelle
                   </Button>
                </Col>
               </Form>
             )}
              />
            </Container>
        )
      }
    }
}
const mapStateToProps = state => ({
  profileStatus : state.business.providerProfile,
  isProfileUpdateSuccess: state.business.providerProfile.isProfileUpdateSuccess,
  isProfileUpdateFail: state.business.providerProfile.isProfileUpdateFail,
  profileProviderData : state.business.providerProfile.providerProfileInformation
})
export default connect(mapStateToProps, { providerProfile, updateProviderProfile })(ProfileForm)
