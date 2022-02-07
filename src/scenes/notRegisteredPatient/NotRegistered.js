import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Container, Spinner, Alert } from 'react-bootstrap';
import {parseISO,format} from "date-fns";
import AmbulanceDetailCard from '../companyDetail/components/AmbulanceDetailCard.js';
import ReservationInfo from '../companyDetail/components/ReservationInfo.js';
import NotRegisteredInfo from './components/NotRegisteredInfo.js';
import RelativeInfo from '../companyDetail/components/RelativeInfo.js';
import { createReservationNotRegister } from '../../services/MakeReservation/MakeReservationAction';
import { loginUser } from '../../services/Login/LoginAction';



class NotRegistered extends Component {
  constructor(props,context){
    super(props,context)
    this.state = {
      selectedRelative: false,
      patient: null,
      client: null,
      isHidden: true,
      isFormValid: null,
      showInfo: false,
      showRelative: false,
      showPatient: false,
      isButtonDisabled :false
    };
    this.createReservationHandler = this.createReservationHandler.bind(this);
    this.selectedRelative = this.selectedRelative.bind(this);
    this.selectedPatient = this.selectedPatient.bind(this);
    this.reservationDataHandler = this.reservationDataHandler.bind(this);
  }
  fieldValues = {
    client: null,
    patient: null,
    app_appointment_time: '04-10-2019 11:05:00',
    app_price: Math.round(this.props.providerData.totalPrice),
    payment_type_id: 1,
    provider_id: this.props.providerData.pro_id,
  }

  createReservationHandler(){
    console.log('res', this.props.makeReservation);
    let date = this.fieldValues.app_appointment_time;
    let formattedDate = format(date, 'dd-MM-yyyy HH:mm');
    this.fieldValues.app_appointment_time = formattedDate;
    var tempField = JSON.parse(JSON.stringify(this.fieldValues))
    this.fieldValues = Object.assign({}, tempField, this.props.userFilterData);

    if(this.state.isFormValid){
      this.props.createReservationNotRegister(this.fieldValues);

    }else{
    }
    this.setState({
      isButtonDisabled : true
    })
  }

  validateForm(){
    const isFromValid= this.fieldValues.app_from !== null;
    const isToValid= this.fieldValues.app_to !== null;
    const isPatientValid= this.fieldValues.patient !== null;
    const isClientValid= this.fieldValues.client !== null;
    const isDateValid= this.fieldValues.app_appointment_time !== null;
    const isFormValid= (isFromValid && isToValid && isPatientValid && isDateValid && isClientValid );
    this.setState({
      isFormValid: isFormValid
    });
  }

  closePatientTabHandler(){
    this.setState((prevState)=>({
      showInfo: false
    }))
  }

  reservationDataHandler(query){
    var tempField = JSON.parse(JSON.stringify(this.fieldValues))
    this.fieldValues = Object.assign({}, tempField, query)
    this.validateForm();
    this.setState((prevState)=>({
      showRelative: true
    }))
  }

  selectedRelative(data){
      var tempField = JSON.parse(JSON.stringify(this.fieldValues.client))
      this.fieldValues.client = Object.assign({}, tempField, data)
      this.validateForm();
      this.setState((prevState)=>({
        showPatient: true
      }))
  }

  selectedPatient(data){
      var tempField = JSON.parse(JSON.stringify(this.fieldValues.patient))
      this.fieldValues.patient = Object.assign({}, tempField, data)
      this.validateForm();
      this.setState((prevState)=>({
        showInfo: true
      }))
  }

    redirectAppointment() {
      if(this.props.makeReservation.app_id !== null){
          return <Redirect to={"/reservationstatus/"+ this.props.makeReservation.app_id} />;
      }
    }
    renderButton() {
      if(this.props.makeReservation.loading){
        return (
          <Button className="orangeButton" disabled>
            <Spinner animation="border"/>
            <span className="sr-only">Loading...</span>
          </Button>
        );
      }else{
        return (<Button style={{marginTop: '2em', float: 'none'}} disabled={ !this.state.isFormValid || this.state.isButtonDisabled } className={'orangeButton '+(this.state.showRelative ? '' : 'd-none')} type="button" onClick={this.createReservationHandler}>Rezervasyon Oluştur</Button>)
      }
    }

    renderAlert() {
      if(this.props.makeReservation.fail){
        return (
          <Alert variant="danger">
              <p>
                {this.props.makeReservation.message}
              </p>
            </Alert>
        );
      }
    }

  render() {
    const {makingReservation} = this.props.makeReservation;
    if (!makingReservation) {
      return <p> loading... </p>;
    } else {
       return (
        <Container>
          <AmbulanceDetailCard classNameProp={' d-none sssss'} />
          <ReservationInfo resData={this.reservationDataHandler} userFilterData={this.props.userFilterData} closePatientTab={this.closePatientTabHandler.bind(this)}/>
          <RelativeInfo relativeData={this.selectedRelative} classNameProp={(this.state.showRelative ? '' : 'd-none')} />
          <NotRegisteredInfo patientData={ this.selectedPatient } classNameProp={(this.state.showPatient? '' : 'd-none')}/>
          {this.renderAlert()}
          <div style={{margin: '0 auto', width: 'auto', textAlign: 'center'}}>
            {this.renderButton()}
          </div>
          {this.redirectAppointment()}
        </Container>
      )
    }
  }
}


const mapStateToProps = state => ({
  makeReservation: state.makeReservation,
  loading: state.makeReservation.loading,
  userFilterData: state.provider.userFilterData,
  providerData: state.makeReservation.makingReservation,
})

export default connect(mapStateToProps, { createReservationNotRegister, loginUser })(NotRegistered)
