import React from 'react';
import  '../StationInformationStyle.css';
import {connect} from 'react-redux';
import Script from 'react-load-script';
import {updateStation, resetStationBox} from '../../../../services/provider/Stations/StationAction';
import {Row, Col, Container, Button, Form, Alert } from 'react-bootstrap';



class StationDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      origin: this.props.station.sta_address,
      lng:this.props.station.sta_longitude,
      lat:this.props.station.sta_latitude,
      name: this.props.station.sta_name,
      addressDesc: this.props.station.sta_address_desc,
      errors: {name: '', address: '', origin: ''},
      nameValid: true,
      addressValid: true,
      originValid: true,
      formValid: true,

    };
    this.props.resetStationBox();
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateStation = this.updateStation.bind(this);
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
    this.setState({formValid: this.state.nameValid && this.state.addressValid && this.state.originValid});
  }
  handleScriptLoad() {
    /*global google*/
    this.originInput = new google.maps.places.Autocomplete(document.getElementById(this.props.station.sta_id ));
    this.originInput.setFields(['address_component', 'formatted_address','place_id', 'geometry']);
    this.originInput.setComponentRestrictions({ 'country': ['tur'] });
    this.originInput.addListener('place_changed', this.handlePlaceSelect);
  }
  handlePlaceSelect(e) {
    let addressObjectOrigin = this.originInput.getPlace();

    let fieldValidationErrors = this.state.errors;
    if(addressObjectOrigin){
      const lat = addressObjectOrigin.geometry.location.lat();
      const lng = addressObjectOrigin.geometry.location.lng();
      fieldValidationErrors.origin = '';
      this.setState({
        errors: fieldValidationErrors,
        originValid: true,
        origin: addressObjectOrigin.formatted_address,
        lng: lng,
        lat: lat
      }, this.validateForm);

    }else{
      fieldValidationErrors.origin = 'Konumu listeden seçiniz.';

      this.setState({
        errors: fieldValidationErrors,
        originValid: false,
        origin: e.target.value
      },this.validateForm);
    }
  }

  updateStation(){
    this.validateForm();

    const fields={
      sta_id: this.props.station.sta_id,
      sta_name: this.state.name,
      provider_id: this.props.station.provider_id,
      sta_address: this.state.origin,
      sta_address_desc: this.state.addressDesc,
      sta_latitude: this.state.lat,
      sta_longitude: this.state.lng
    }
    if(this.state.formValid){
      this.props.updateStation(fields,this.props.station.sta_id);
    }else{

    }
  }
  alertRender (){
    if(this.props.isSuccess&&(this.props.stationInfo.updatedStaID===this.props.station.sta_id)){
      return(
        <Alert variant="success">
                  <p>
                  Bilgileriniz başarıyla güncellenmiştir.
                  </p>
        </Alert>
      )
    }
  if(this.props.isFailed&&(this.props.stationInfo.updatedStaID===this.props.station.sta_id)){
    return(
      <Alert variant="danger">
          <p>
          Bilgileriniz güncellenemedi. Lütfen tekrar deneyiniz.
          </p>
        </Alert>
    )
    }
  }

  render(){
      return (
        <div className = "stationContainer">
        <div>
          <p className = "stationTitle">{this.props.station.sta_name} </p>
        </div>
        <Container >
          <Form onSubmit={(e)=> {
            e.preventDefault();
            this.updateStation();
          }}>
            <Row className="form-row stationRow">
              <Col className ="stationLabel" md = {{span: 4}}>İstasyon Adı:</Col>
              <Col xs="12" sm="6" md = {{span : 4}} className="form-col">
                <input name="name" type="text"  defaultValue={this.props.station.sta_name} placeholder="İstasyon Adı"  className={'form-control stationForm ' +(this.state.nameValid ? '': 'is-invalid')} onChange={this.handleUserInput} />
                {this.state.nameValid ? null : <p  className="invalid-feedback">{this.state.errors.name}</p>}
              </Col>
            </Row>

            <Row className="form-row stationRow">
              <Col className ="stationLabel" md = {{span: 4}}>İstasyonun tam adresi:</Col>
              <Col xs="12" sm="6" md = {{span : 4}} className="form-col">
                <input name="addressDesc"  type="text" defaultValue={this.props.station.sta_address_desc} placeholder="İstasyon Tam adresi" className={'form-control stationForm ' +(this.state.addressValid ? '': 'is-invalid')} onChange={this.handleUserInput} />
                {this.state.addressValid ? null : <p  className="invalid-feedback">{this.state.errors.address}</p>}
              </Col>
            </Row>

            <Row className="form-row">
              <Col className ="stationLabel" md = {{span: 4}}>İstasyonun konumunu:</Col>
              <Col xs="12" sm="6" md = {{span : 4}} className="form-col">
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk9rtXITPUibY0DDBWkB4eDQOQJv70LXg&libraries=places" onLoad={this.handleScriptLoad} />
               <input name="origin" id={this.props.station.sta_id} type="text" defaultValue={this.props.station.sta_address} placeholder="İstasyonun Konumu" onChange={this.handlePlaceSelect} className={'form-control stationForm ' +(this.state.originValid ? '': 'is-invalid')} />
               {this.state.originValid ? null : <p  className="invalid-feedback">{this.state.errors.origin}</p>}
              </Col>
              {this.state.formValid ? null : <p className="invalid-feedback">Bilgileri kontrol ediniz.</p>}
           </Row>
           {this.alertRender()}

           <Col className ="stationLabel" md = {{span: 4, offset: 10}}>
              <Button type="submit" className="orangeButton">Güncelle</Button>
           </Col>
          </Form>
        </Container>
      </div>
      ) ;
    }
  }

const mapStateToProps = state => ({
  isSuccess: state.stationInfo.isSuccess,
  isFailed:state.stationInfo.isFailed,
  stationInfo: state.stationInfo
})
export default connect (mapStateToProps,{updateStation, resetStationBox}) (StationDetail)
