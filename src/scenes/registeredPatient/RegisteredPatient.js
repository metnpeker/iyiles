 import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import {parseISO,format} from "date-fns";
import { Button, Container, Spinner, Alert } from 'react-bootstrap';
import AmbulanceDetailCard from '../companyDetail/components/AmbulanceDetailCard.js';
import ReservationInfo from '../companyDetail/components/ReservationInfo.js';
import PatientInformation from '../UserProfile/components/PatientInformation'
import { createReservation} from '../../services/MakeReservation/MakeReservationAction';
import { getMemberForm } from '../../services/UserProfile/UserAction';

class RegisteredPatient extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedPatient: false,
      patientId: '',
      isHidden: true,
      isFormValid: null,
      showInfo: false,
      isButtonDisabled :false
    };
    this.createReservationHandler = this.createReservationHandler.bind(this);
    this.selectedPatientData = this.selectedPatientData.bind(this);
    this.reservationDataHandler = this.reservationDataHandler.bind(this);
    this.props.getMemberForm();
  }
  fieldValues = {
    patient_id: null,
    app_appointment_time: '04-10-2019 11:05:00',
    app_price: Math.round(this.props.providerData.totalPrice),
    client_id: this.props.member.c_id,
    payment_type_id: 1,
    provider_id: this.props.providerData.pro_id,
  }
  createReservationHandler(){
    let date = this.fieldValues.app_appointment_time;

    let formattedDate = format(parseISO(date), 'dd-MM-yyyy HH:mm');
    this.fieldValues.app_appointment_time = formattedDate;

    var tempField = JSON.parse(JSON.stringify(this.fieldValues))
    this.fieldValues = Object.assign({}, tempField, this.props.userFilterData);

    if(this.props.newPatientId !== null){
      this.fieldValues.patient_id = this.props.newPatientId;
    }

    if(this.state.isFormValid){
      this.props.createReservation(this.fieldValues);
    }
    this.setState({
      isButtonDisabled : true
    })
  }

  validateForm(){
    const isFromValid= this.fieldValues.app_from !== null;
    const isToValid= this.fieldValues.app_to !== null;
    if(this.fieldValues.patient_id == null) {
        this.fieldValues.patient_id = this.props.newPatientId;
    }
    const isPatientValid= this.fieldValues.patient_id !== null;
    const isDateValid= this.fieldValues.app_appointment_time !== null;
    const isFormValid= (isFromValid && isToValid && isPatientValid && isDateValid );

    this.setState({
      isFormValid: isFormValid
    });
  }
  reservationDataHandler(query){
    //keep location date time info

    var tempField = JSON.parse(JSON.stringify(this.fieldValues))
    this.fieldValues = Object.assign({}, tempField, query)

    this.validateForm();
//set state'i if e bağla

    this.setState((prevState)=>({
      showInfo: true
    }))
  }
  closePatientTabHandler(){
    this.setState((prevState)=>({
      showInfo: false
    }))
  }
  selectedPatientData(data){
    var tempField = JSON.parse(JSON.stringify(this.fieldValues))
    this.fieldValues = Object.assign({}, tempField, data)
    this.validateForm();
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
      return (<Button style={{marginTop: '2em', float: 'none'}} disabled={!this.state.isFormValid || this.state.isButtonDisabled } className={'orangeButton '+(this.state.showInfo? '' : 'd-none')} type="button" onClick={this.createReservationHandler}>Rezervasyon Oluştur</Button>)
    }
  }
  renderAlert() {
    if(this.props.makeReservation.fail){
      return (
        <Alert variant="danger">
            <p>
              Randevunuz oluşturulamadı. {this.props.makeReservation.message}
            </p>
          </Alert>
      );
    }
  }

  render() {
    const { makingReservation } = this.props.makeReservation;

    if (!makingReservation) {
      return <p> loading... </p>;
    } else {
      return (
        <Container>
          <AmbulanceDetailCard />
          <ReservationInfo resData={this.reservationDataHandler} userFilterData={this.props.userFilterData} closePatientTab={this.closePatientTabHandler.bind(this)}/>
          <PatientInformation classNameProp={'informationContainer card container ' + (this.state.showInfo? '' : 'd-none')} selectedPatient={this.selectedPatientData}/>
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
  providerData: state.makeReservation.makingReservation,
  selectedPatient: state.makeReservation.selectedPatient,
  member: state.member.membersData,
  newPatientId : state.member.newPatientId,
  userFilterData: state.provider.userFilterData
})

export default connect(mapStateToProps, { createReservation, getMemberForm })(RegisteredPatient)
