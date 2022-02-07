import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Form, Col, Button } from 'react-bootstrap'
import { filterProviders,sendFilterAddressData } from '../../../services/Providers/ProviderAction';
import Script from 'react-load-script';
import '../searchStyle.css';

 class Filter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          from:'',
          to:'',
          fromLatLng: null,
          toLatLng: null,
          starting_point: '',
          service_type: null,
          errors: {from:'',to:'',service:''},
          toValid:'',
          fromValid:'',
          serviceValid: '',
          formValid: false
        };
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handleToSelect = this.handleToSelect.bind(this);
        this.handleFromSelect = this.handleFromSelect.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.props.filterProviders();
        this.props.filteredHandler(false);
    }

  validateForm() {

      let fieldValidationErrors = this.state.errors;
      let fromValid = this.state.fromValid;
      fromValid = this.state.from.length>=1;
      fieldValidationErrors.from = fromValid ? '' : 'Adres boş olamaz.';
      this.setState({errors: fieldValidationErrors,
        fromValid: fromValid
      });
      let toValid = this.state.toValid;
      toValid = this.state.from.length>=1;
      fieldValidationErrors.to = toValid ? '' : 'Adres boş olamaz.';
      this.setState({errors: fieldValidationErrors,
        toValid: toValid
      });
      this.setState({formValid: this.state.fromValid && this.state.toValid });

      let serviceValid = this.state.serviceValid;
      serviceValid = this.state.service_type != null;
      fieldValidationErrors.service = serviceValid ? '' : 'Ambulans tipini seçiniz.';
      this.setState({errors: fieldValidationErrors,
        serviceValid: serviceValid
      });

    }
  handleScriptLoad() {
      /*global google*/
      this.fromInput = new google.maps.places.Autocomplete(document.getElementById('from-input'));
      this.fromInput.setFields(['address_component', 'formatted_address','place_id','geometry']);
      this.fromInput.setComponentRestrictions({ 'country': ['tur'] });
      this.fromInput.addListener('place_changed', this.handleFromSelect);
      this.toInput = new google.maps.places.Autocomplete(document.getElementById('to-input'));
      this.toInput.setFields(['address_component', 'formatted_address','place_id','geometry']);
      this.toInput.setComponentRestrictions({ 'country': ['tur'] });
      this.toInput.addListener('place_changed', this.handleToSelect);
    }
  handleFromSelect() {
  let errors = this.state.errors;
  let address = '';
  let district = '';
  let addressObjectFrom = this.fromInput.getPlace();
  if ("formatted_address" in addressObjectFrom) {
    errors.from = '';
    let fromLat = addressObjectFrom.geometry.location.lat();
    let fromLng = addressObjectFrom.geometry.location.lng();
    let fromLatLng = {lat: fromLat, lng: fromLng}
    address = addressObjectFrom.address_components.filter(address => {
      if (address.types[0] === 'administrative_area_level_2') {
        return address;
      } else {
        return null;
      }
    })
    district = address[0].long_name;
    this.setState({
      from: addressObjectFrom.formatted_address,
      starting_point: district,
      fromLatLng: fromLatLng,
      errors: errors,
      fromValid: true,
    });
  } else {
    errors.from = 'Konumu listeden seçiniz.';
    this.setState({
      ...this.state,
      errors: errors,
      fromValid: false,
    });
  }
}
handleToSelect(){
  let errors = this.state.errors;
  let address = '';
  let district = '';
  let addressObjectTo = this.toInput.getPlace();
  if ("formatted_address" in addressObjectTo) {
    errors.from = '';
    let toLat = addressObjectTo.geometry.location.lat();
    let toLng = addressObjectTo.geometry.location.lng();
    let toLatLng = {lat: toLat, lng: toLng}
    address = addressObjectTo.address_components.filter(address => {
      if (address.types[0] === 'administrative_area_level_2') {
        return address;
      } else {
        return null;
      }
    })
    district = address[0].long_name;
    this.setState({
      to: addressObjectTo.formatted_address,
      toLatLng: toLatLng,
      errors: errors,
      toValid: true,
    });
  } else {
    errors.to= 'Konumu listeden seçiniz.';
    this.setState({
      ...this.state,
      errors: errors,
      toValid: false,
    });
  }
}

changeOptionHandler = (e) => {
    this.setState({
      service_type: e.target.value
    },this.validateForm);
  }
  handleSubmit(e) {
    e.preventDefault();
    const starting_point = this.state.starting_point;
    const service = this.state.service_type;
    const fromLatLng = this.state.fromLatLng;
    const toLatLng = this.state.toLatLng;

    this.props.filterProviders(starting_point, service);
    const userFilterData = {
      app_from: this.state.from,
      app_to: this.state.to,
      service_id: service,
      fromLatLng: fromLatLng,
      toLatLng: toLatLng
    }
    this.validateForm();

    if(this.state.formValid){
      this.props.sendFilterAddressData(userFilterData);
      this.props.filteredHandler(true);
    }

  }

  render() {
    return (
      <div className="style">
        <Form onSubmit={this.handleSubmit} >
         <Form.Row className="rowStyle">
          <Col md={{span: 2, offset : 1}} lg="2" >
              <div>
                <input className="controlStyle" style={{border: '2px solid #F68A25' }} name="from" id="from-input" type="text" placeholder="Nereden" className={'form-control fromForm option-handler  '+(this.state.fromValid||this.state.fromValid === '' ? '': 'is-invalid')}  />
                {this.state.fromValid ? null : <p  className="invalid-feedback">{this.state.errors.from}</p>}
              </div>
           </Col>
           <Col md= "2" lg ="2">
              <div>
                 <input className="controlStyle" style={{border: '2px solid #F68A25' }} name="to" id="to-input" type="text" placeholder="Nereye" className={'form-control toForm option-handler ' +(this.state.toValid ||this.state.toValid === ''  ? '': 'is-invalid')}/>
                  {this.state.toValid ? null : <p  className="invalid-feedback">{this.state.errors.to}</p>}
              </div>
           </Col>
           <Col md = "3" lg="3">
                <Form.Control className="controlStyle" style={{border: '2px solid #F68A25' }} as="select" value={this.props.serviceType} onChange={this.changeOptionHandler.bind(this)} className={'toForm option-handler ' +(this.state.serviceValid ||this.state.serviceValid === ''  ? '': 'is-invalid')}>
                  <option value="" disabled selected >Ambulans Tipi</option>
                  {this.props.serviceTypeOptions.map(function(option){
                      return ( <option key={option.id} value={option.id}>{option.name}</option>)
                    })}
                </Form.Control>
                {this.state.serviceValid ? null : <p  className="invalid-feedback">{this.state.errors.service}</p>}

          </Col>
              <Col md = {{span :2}} style = {{textAlign : "center"}}>
                <Button className="orangeButton" lg="2" md="2" type="submit" > Listele </Button>
              </Col>
                <Col md="2" lg="2">
                    <Form.Control className="controlStyle" style={{border: '2px solid #F68A25' }} as="select">
                        <option>Sırala</option>
                        <option>Fiyata göre Artan</option>
                        <option>Fiyata göre Azalan</option>
                        <option>Sabit Nokta Ambulansı</option>
                    </Form.Control>
                </Col>

            </Form.Row>
        </Form>

      </div>
    )
  }
}
const mapStateToProps = state => {

}


export default connect(mapStateToProps,{filterProviders,sendFilterAddressData })(Filter)
