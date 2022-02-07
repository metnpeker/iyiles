import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Script from 'react-load-script';
import DatePicker from "react-datepicker";
import {parseISO,format} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import '../reservationInfoStyle.css';



class ReservationInfo extends Component {
  // Tarih için
  constructor(props) {
    super(props);
    this.state = {
      resDate: new Date(),
      returnDate: new Date(),
      checked: 'true',
      oneway: 'disabled',
      selectedOption: "option1",
      app_from: '',
      app_to: '',
      errors: {dest: '', origin: '', date: ''},
      fromValid: null,
      toValid: null,
      dateValid: null,
      isButtonDisabled : false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleDestSelect = this.handleDestSelect.bind(this);
  }

  handleChange(date) {
    let fieldErrors = this.state.errors;

    if(date===null){
      fieldErrors.date = 'Tarih ve Saat seçiniz. Örnek: \'01.01.2019 00:00\'';
      this.setState({
        resDate: date,
        errors: fieldErrors,
        dateValid: false,
        checked: !this.state.checked,
      })
    }else{
      fieldErrors.date = ' ';
      this.setState({
        resDate: date,
        errors: fieldErrors,
        dateValid: true,
        checked: !this.state.checked,
      });
    }

  }
  handleScriptLoad() {
    /*global google*/
    this.originInput = new google.maps.places.Autocomplete(document.getElementById('origin-input'));
    this.originInput.setFields(['address_component', 'formatted_address']);
    this.originInput.setComponentRestrictions({ 'country': ['tur'] });
    this.originInput.addListener('place_changed', this.handlePlaceSelect);
    this.destInput = new google.maps.places.Autocomplete(document.getElementById('dest-input'));
    this.destInput.setFields(['address_component', 'formatted_address']);
    this.destInput.setComponentRestrictions({ 'country': ['tur'] });
    this.destInput.addListener('place_changed', this.handleDestSelect);
  }
  handlePlaceSelect() {
    let addressObjectOrigin = this.originInput.getPlace();
    let fieldErrors = this.state.errors;
    if ( "formatted_address" in addressObjectOrigin){
      fieldErrors.origin = '';
      this.setState(
        {
          app_from: addressObjectOrigin.formatted_address,
          errors: fieldErrors,
          fromValid: true,
        }
      );
    } else {
      fieldErrors.origin = 'Konumu listeden seçiniz.';
      this.setState(
        {
          app_from: null,
          errors: fieldErrors,
          fromValid: false,
        }
      );
    }
  }
handleDestSelect() {
  let addressObjectDest = this.destInput.getPlace();
  let fieldErrors = this.state.errors;
    if ( "formatted_address" in addressObjectDest){
      fieldErrors.dest = '';
      this.setState(
        {
          app_to: addressObjectDest.formatted_address,
          errors: fieldErrors,
          toValid: true,
        }
      );
    } else {
      fieldErrors.dest = 'Konumu listeden seçiniz.';
      this.setState(
        {
          app_to: null,
          errors: fieldErrors,
          toValid: false,
        }
      );
    }
}
  // Saat için

  onTimeChange(options) {
    // do something
  }

  onFocusChange(focusStatue) {
    // do something
  }

  onChanged = e => {

    const value = e.target.value === 'disabled' ? '' : 'disabled';

    this.setState({ [e.target.name]: value });
    this.setState({
      selectedOption: e.target.value
    });
  }
  sendResData(){
    const date = {
      app_appointment_time: this.state.resDate
    }
    this.setState({
      isButtonDisabled : true

    })

    this.props.resData(date);
  }
  closePatientTab(){
    this.props.closePatientTab();
  }

  render() {
    return (
      <React.Fragment>
        <Container className="reservationContainer">

            <h3 style={{ color: '#000000', fontSize: '25px', fontFamily: 'Open sans, sans-serif', fontWeight: 'Bold', textAlign: 'center' }}>
              Rezervasyon Bilgileri
            </h3>

        </Container>
        <Container className="informationContainer">
          <Row className="informationDetailRow">
            <Col md="4" >
              <p style={{ color: '#707070', fontSize: '15px', fontFamily: 'Open sans, sans-serif', fontWeight: 'Bold' }}>
                Detaylı Tarih ve Adres Bilgileri
              </p>
              <hr />
            {/*  <Form style={{ fontSize: '15px', fontFamily: 'Open sans, sans-serif', fontWeight: 'bold' }}>
                <div key={`custom-inline-radio`} >
                  <Form.Check
                    custom
                    inline
                    label="Sadece Gidiş"
                    type="radio"
                    id={`custom-inline-1`}
                    onChange={this.onChanged}
                    checked={this.state.selectedOption === "option1"}
                    value="option1"
                    name="oneway"
                  />

                  <Form.Check
                    custom
                    inline
                    label="Gidiş - Dönüş"
                    type="radio"
                    id={`custom-inline-2`}
                    name="oneway"
                    value={this.state.oneway}
                    onChange={this.onChanged}
                    checked={this.state.selectedOption !== "option1"}
                  />
                </div>

              </Form> */}
            </Col>
            <Col md="4 " className="destination-col" onClick={this.closePatientTab.bind(this)}>
              <p className="destination_p">
                Nereden
              </p>
               <p>{this.props.userFilterData.app_from}</p>

              <p className="destination_p">
                Gidiş Tarih ve Saat
              </p>
              <DatePicker className={'form-control' +(this.state.dateValid || this.state.dateValid===null ? ' mb-3 ': ' is-invalid')}
                selected={this.state.resDate}
                onChange={this.handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="dd-MM-yyyy HH:mm"
                calendarClassName="myPopperClassName"
                name="gidis-tarihi"
              

              />
              <p className="invalid-feedback-custom" >{this.state.errors.date}</p>
            </Col>
            <Col md="4">
              <p className="destination_p">
                Nereye
              </p>
              <p>{this.props.userFilterData.app_to}</p>
            </Col>

           <Button type="button" onClick={this.sendResData.bind(this)} className="float-right orangeButtonUserProfile" >Bilgileri Kaydet</Button>

          </Row>

        </Container>

      </React.Fragment>
    )
  }
}
export default ReservationInfo;
