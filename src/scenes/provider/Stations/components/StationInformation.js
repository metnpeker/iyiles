import React from 'react';
import  '../StationInformationStyle.css';
import {Row, Col, Alert, Container, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import Script from 'react-load-script';
import {addNewStation} from '../../../../services/provider/Stations/StationAction';
import { Form } from 'formik';

class StationInformation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      location: '',
      lng: '',
      lat: '',
      name: '',
      address: '',
      errors: {location: '', name: '', address: ''},
      locationValid: null,
      nameValid: null,
      addressValid: null,
      formValid: false,
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.addStation = this.addStation.bind(this);
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
      ()=>{this.validateField(name, value)});
  }
  validateField(field, value){
    let fieldValidationErrors = this.state.errors;
    let nameValid = this.state.nameValid;
    let addressValid = this.state.addressValid;
    switch(field){
      case 'name':
        nameValid = (value.length>=3);
        fieldValidationErrors.name = nameValid ? '' : 'İstasyon ismi en az 3 harf olmalıdır.';
        break;
      case 'address':
        addressValid = value.length>=20;
        fieldValidationErrors.address = addressValid ? '' : 'İstasyon ismi en az 20 harf olmalıdır.';
        break;
      default:
        break;
    }
    this.setState({errors: fieldValidationErrors,
      nameValid: nameValid,
      addressValid: addressValid,
    }, this.validateForm);
  }
  validateForm() {
    const isNameValid = this.state.name !==null;
    const isLocationValid = this.state.location !==null;
    const isAddressValid = this.state.adress !==null;
    const isFormValid = (isNameValid && isLocationValid && isAddressValid);
     this.setState ({
       isFormValid: isFormValid
     })
  }

  handleScriptLoad() {
    /*global google*/
    this.originInput = new google.maps.places.Autocomplete(document.getElementById('location'));
    this.originInput.setFields(['address_component', 'formatted_address','place_id', 'geometry']);
    this.originInput.setComponentRestrictions({ 'country': ['tur'] });
    this.originInput.addListener('place_changed', this.handlePlaceSelect);
  }
  handlePlaceSelect(e) {

     const addressObjectOrigin = this.originInput.getPlace();
    let fieldValidationErrors = this.state.errors;
    if(addressObjectOrigin){
      const lat = addressObjectOrigin.geometry.location.lat();
      const lng = addressObjectOrigin.geometry.location.lng();
      fieldValidationErrors.origin = '';
      this.setState({
        errors: fieldValidationErrors,
        locationValid: true,
        location: addressObjectOrigin.formatted_address,
        lng: lng,
        lat: lat
      }, this.validateForm);
    }else{

      fieldValidationErrors.location = 'Konumu listeden seçiniz.';
      this.setState({
        errors: fieldValidationErrors,
        locationValid: false,
        location: e.target.value
      },this.validateForm);
    }
  }
  addStation(){
    this.validateForm();
    const fields={
      sta_name: this.state.name,
      provider_id: this.props.providerID,
      sta_address: this.state.location,
      sta_address_desc: this.state.address,
      sta_latitude: this.state.lat,
      sta_longitude: this.state.lng
    }
    if(this.state.isFormValid){

      this.props.addNewStation(fields);
    }else{
    }
  }

  alertRender (){
    if(this.props.isAddSuccess){
      return(
        <Alert variant="success">
           <p>
             İstasyon başarıyla eklenmiştir.
           </p>
        </Alert>
      )
    }
  if(this.props.isAddFailed){
    return(
      <Alert variant="danger">
        <p>
         İstasyon eklenemedi. Tekrar deneyiniz.
        </p>
      </Alert>

      )
    }
  }

  render(){
    return(
      <div  className = "stationContainer">
        <div>
            <p className = "stationTitle"> Yeni İstasyon Ekle</p>
        </div>
        <Container >
          <Form onSubmit={(e)=> {
            e.preventDefault();
            this.addStation();
          }}>
            <Row className="form-row stationRow">
              <Col className ="stationLabel" md = {{span: 4}}>İstasyon Adı:</Col>
              <Col xs="12" sm="6" md = {{span : 4}} className="form-col">
                <input name="name" type="text"   placeholder="İstasyon Adı"  className={'form-control stationForm ' +(this.state.nameValid===null||this.state.nameValid ? '': 'is-invalid')} onChange={this.handleUserInput} />
                {this.state.nameValid ? null : <p  className="invalid-feedback">{this.state.errors.name}</p>}
              </Col>
            </Row>
            <Row className="form-row stationRow">
              <Col className ="stationLabel" md = {{span: 4}}>İstasyonun tam adresi:</Col>
              <Col xs="12" sm="6" md = {{span : 4}} className="form-col">
                <input name="address"  type="text"  placeholder="İstasyon Lokasyonu" className={'form-control stationForm ' +(this.state.addressValid === null || this.state.addressValid ? '': 'is-invalid')} onChange={this.handleUserInput} />
                {this.state.addressValid ? null : <p  className="invalid-feedback">{this.state.errors.address}</p>}
              </Col>
            </Row>
            <Row className="form-row">
              <Col className ="stationLabel" md = {{span: 4}}>İstasyonun konumunu:</Col>
              <Col xs="12" sm="6" md = {{span : 4}} className="form-col">
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk9rtXITPUibY0DDBWkB4eDQOQJv70LXg&libraries=places" onLoad={this.handleScriptLoad} />
               <input name="origin" id='location' type="text" placeholder="İstasyon Adresi" onChange={this.handlePlaceSelect} className={'form-control stationForm ' +(this.state.locationValid=== null ||this.state.locationValid ? '': 'is-invalid')} />
               {this.state.locationValid ? null : <p  className="invalid-feedback">{this.state.errors.location}</p>}
              </Col>
              {this.state.formValid ? null : <p className="invalid-feedback">Bilgileri kontrol ediniz.</p>}
           </Row>
           {this.alertRender()}
           <Col className ="stationLabel" md = {{span: 4, offset: 10}}>
              <Button type="submit" className="orangeButton"> Ekle</Button>
           </Col>
          </Form>
        </Container>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  stations : state.stationInfo.stationsLocationInformation,
  isSuccess: state.stationInfo.isSuccess,
  isFailed: state.stationInfo.isFailed
})
export default connect (mapStateToProps,{addNewStation}) (StationInformation);
