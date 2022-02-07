import React, { Component } from 'react';
import {connect} from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {Form, Col, Button } from 'react-bootstrap';
import Script from 'react-load-script';

import { getDistance } from './Map.js';
import { filterProviders, updateProvidersPrice, sendFilterAddressData, sortProviders } from '../../../services/Providers/ProviderAction';
import '../searchStyle.css';

class AddressPicker extends Component {
  constructor(props){
    super(props);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handleFromSelect = this.handleFromSelect.bind(this);
    this.handleToSelect = this.handleToSelect.bind(this);
    this.sortProviders = this.sortProviders.bind(this);
    this.isSameCity = this.isSameCity.bind(this);
    this.state = {
      app_from : null,
      app_to: null,
      errors: { app_from:'', app_to:'' },
      app_fromValid: null,
      app_toValid: null,
      formValid: false,
      serviceType: 1,
      loading: true,
      prices :[],
      sortAvailable : true,
      selectAlert: false,
      cityAlert: false,
      from_place_id: null,
      to_place_id: null,
      from_city: null,
      to_city: null,
      cityCheck: null
    }
    this.props.filterProviders();
    }

  isSameCity(oCity, dCity) {
    if(oCity === dCity){
      return true;
    }else{
      return false;
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleFromSelect(e) {
      this.setState({ app_from : e.description, from_place_id: e.place_id, from_city:e.terms[e.terms.length-2].value,  cityCheck: e.terms[e.terms.length-2].value});
  }

  handleToSelect(e) {
    this.setState({ app_to: e.description, to_place_id: e.place_id, to_city:e.terms[e.terms.length-2].value });
  }

  handleSelectAlert() {
      if( this.state.selectAlert) {
        return ( <p style={{color:'red', fontWeight:'bold', fontSize:'15px'}}> **Adresi listeden seçiniz. </p>) }
      else {
          return null;
      }
    }

  handleCityAlert() {
      if( this.state.cityAlert) {
        return ( <p style={{color:'red', fontWeight:'bold', fontSize:'15px'}}> **Sadece İzmir'de arama yapabilirsiniz. </p>) }
      else {
          return null;
      }
  }

  handleScriptLoad() {
    /*global google*/
  }

  getProviderList() {
    if(this.state.from_place_id == null || this.state.to_place_id == null){
      this.setState({ selectAlert: true });
    }else if (this.state.cityCheck.toUpperCase() !== "İZMIR") {
      this.setState({ cityAlert: true });
    }else {
      this.setState({ selectAlert: false });
      this.setState({ cityAlert: false });
      this.props.filterLoadingHandler(true);
      const sameCity = this.isSameCity(this.state.from_city, this.state.to_city);
      const dService = new google.maps.DistanceMatrixService();

      this.props.getDistance(dService, this.state.app_from, this.state.app_to, this.props.providers, this.state.serviceType, sameCity)
           .then(res => {
             this.props.filterLoadingHandler(false);
             const userFilterData = {
               app_from: this.state.app_from,
               app_to: this.state.app_to,
               service_id: this.state.serviceType,

             }
             this.props.sendFilterAddressData(userFilterData);
           })
    }
  };

  isSameAdress(){
    if(this.state.app_to != null && this.state.app_from != null  ){
      if(this.state.app_to == this.state.app_from){
        return (<p style={{color:'red', fontWeight:'bold', fontSize:'15px'}}> **2 Adres Aynı Olamaz. </p> )
      }
      else{
        return null;
      }
    }
    else {
      return null;
    }
  }

  sortProviders(e) {
    this.props.sortProviders(this.props.providers, e.target.value);
  };

  render() {
    return(
      <div className="style">
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk9rtXITPUibY0DDBWkB4eDQOQJv70LXg&libraries=places" onLoad={this.handleScriptLoad} />
        <Form onSubmit = {this.updatePrice}>
         <Form.Row className="rowStyle">
          <Col md={{span: 2, offset : 1}} lg="2" >
            <GooglePlacesAutocomplete

            onPress={(data, details = null) => {
             // 'details' is provided when fetchDetails = true
             if (this.state.app_from) {
               this.updateOrigin(data.description);
             } else {
               this.updateDest(data.description);
             }
           }}
              suggestionsClassNames = {{ container: 'googlePlaceCont', suggestion: 'googlePlaceAuto', suggestionActive: 'googlePlaceAuto-active' }}
              inputClassName = "controlStyle"
              placeholder= 'Nereden'
              onSelect={this.handleFromSelect}
               autocompletionRequest={{
                componentRestrictions: {
                country: ['tur'],
              }

              }}>
              {this.state.app_fromValid ? null : <p  className="invalid-feedback">{this.state.errors.app_from}</p>}
           </GooglePlacesAutocomplete>
           {this.handleCityAlert()}
           {this.handleSelectAlert()}
             </Col>
           <Col md= "2" lg ="2">
           <GooglePlacesAutocomplete
               suggestionsClassNames = {{ container: 'googlePlaceCont', suggestion: 'googlePlaceAuto', suggestionActive: 'googlePlaceAuto-active' }}
               inputClassName = "controlStyle"
               placeholder= 'Nereye'
               onSelect={this.handleToSelect}
                autocompletionRequest={{
                componentRestrictions: {
                country: ['tur'],
                }
              }}>
          </GooglePlacesAutocomplete>
            {this.isSameAdress()}
            {this.handleSelectAlert()}

           </Col>
           <Col md = "3" lg="3">
                <Form.Control  onChange ={this.onChange} name="serviceType" className="controlStyle" style={{border: '2px solid #F68A25' }} as="select" value={this.state.serviceType}>
                  <option defaultValue="" >Ambulans Tipi</option>
                  {this.props.serviceTypeOptions.map(function(option){
                      return ( <option key={option.id} value={option.id}>{option.name}</option>)
                    })}
                </Form.Control>
          </Col>
          <Col md = {{span :2}} style = {{textAlign : "center"}}>
            <Button className="orangeButton" lg="2" md="2" onClick={()=>this.getProviderList()} > Listele </Button>
          </Col>
            <Col md="2" lg="2">
              <Form.Control  onChange ={this.sortProviders} value={this.state.value} className="controlStyle" style={{border: '2px solid #F68A25', marginTop: '10px' }} as="select">
                    <option value = "sırala">Sırala</option>
                    <option value= "0">Fiyata göre Artan</option>
                    <option value= "1">Fiyata göre Azalan</option>
                    <option value= "2">En Yüksek Puan</option>
                    <option value= "3">En İyi Zamanlama</option>
                    <option value= "4">En Yüksek İlgi</option>
                    <option value= "5">En Temiz</option>
                    <option value= "6">En Fazla Yorum Alan</option>
              </Form.Control>
            </Col>
        </Form.Row>
     </Form>
  </div>

    )
  };
}

const mapStateToProps = state => ({
  providers: state.provider.providersData
})

export default connect(mapStateToProps, { filterProviders, getDistance, updateProvidersPrice, sendFilterAddressData, sortProviders })(AddressPicker)
