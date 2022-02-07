import React from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { Col, Row, Card, Accordion, Button, Alert} from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/tr';
import {evaluateAppointment} from '../../../services/provider/showAppointment/showAppointmentAction';
import '../userProfile.css';
class ReservationInformation extends React.Component {
  constructor(props){
     super(props);
         this.evaluateAppointment = this.evaluateAppointment.bind(this);
  }
  evaluateAppointment(appointment){
     appointment.app_status = 4;
     this.props.evaluateAppointment(appointment);
  }
 statusText(status){
   let statusText = null;
   switch(status) {
          case 1:
            statusText='Bekleniyor';
            return statusText;
          case 2:
            statusText='Onaylandı';
            return statusText;
          case 3:
            statusText='Reddedildi';
            return statusText;
          case 4:
            statusText='İptal edildi';
            return statusText;
          case 5:
            statusText='Ödeme bekleniyor';
            return statusText;
          default:
            return null;
        }
 }

  render (){
    moment.locale('tr');
    const now = moment();
    const {loading} = this.props.member;
    if(loading){
      return <p>loading...</p>
    } else {
    return(
      <Card.Body>

      <div>
          {this.props.appointmentsData.map((data,id) => {
            const appTime = moment( data.app_appointment_time, 'DD-MM-YYYY HH:mm') ;
            const timePassed = appTime.diff(now, 'hours', true);
            const hoursLeft = appTime.diff(now, 'hours', true);
            console.log(data.app_appointment_time,hoursLeft);
            if(hoursLeft > 0){
      return(
        <div className = "reservationCard" key={id}>

                <Row>

                  <Col md= {{offset :1, span : 6}}>
                  <h6 style = {{color : "#707070"}}> {data.provider.pro_name} - {data.service.s_name} </h6>
                  <p style = {{color : "#707070", fontSize:"15px", fontWeight:"Bold"}}>Rezervasyon Tarihi:{data.app_appointment_time}</p>
                  <p style = {{color : "#707070", fontSize:"15px", fontWeight:"Bold"}}>Rezervasyon Durumu: {this.statusText(data.app_status)}</p>
                  </Col>
                  <Col md={{ offset: 1}}>
                  <Link to={'/commentbox/' + data.provider.pro_id}>
                  { Math.sign(timePassed) <= 0 && data.app_status === 2 ? <Button className ="orangeButtonUserProfile">
                        Değerlendir
                    </Button> : null}
                   </Link>
                   {data.app_status === 1 || (data.app_status === 2 && hoursLeft>24) ? <Button style = {{margin : "2%"}} onClick = {()=>this.evaluateAppointment(data)} className ="orangeButtonUserProfile">
                       İptal Et
                   </Button> : null }
                  </Col>
                  </Row>
                 <Accordion >
                    <Card>
                       <Card.Header className="reservation-detail-accordion">
                         <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color : "#CCCCCC", fontSize:"15px",fontWeight:"Bold",textDecoration: "underline"}}>
                           Rezervasyon Detayları
                           </Accordion.Toggle>
                      </Card.Header>
                       <Accordion.Collapse style={{fontSize:'14px'}}  eventKey="0">
                           <Card.Body>
                           <Row>
                           <Col xs="12">
                              <p className="patient-info-style"> Adres Bilgileri  </p>
                              <p> <span className="patient-header-style">
                                 Nereden:
                              </span> <span className="patient-body-style">
                                {data.app_from}
                               </span>
                              </p>
                                <p>
                                 <span className="patient-header-style">
                                   Nereye:
                                 </span>
                                 <span className="patient-body-style">
                                   {data.app_to}
                                 </span>
                                </p>
                              <p>
                               <span className="patient-header-style">
                                 Tarih ve Saat:
                               </span>
                               <span className="patient-body-style">
                                {data.app_appointment_time}
                                </span>
                              </p>
                        </Col>
                           <Col xs="12">
                            <p className="patient-info-style"> Hasta Bilgileri </p>
                            <p className="patient-body-style"> {data.patient.pa_name} {data.patient.pa_surname}</p>
                            <p className="patient-body-style"> {data.patient.pa_birthdate} </p>
                            <p className="patient-body-style"> {data.patient.pa_additional_information} </p>
                        </Col>
                           </Row>
                           </Card.Body>
                       </Accordion.Collapse>
                   </Card>
                       </Accordion>
                    </div>
                  )}
                })}
           </div>
       </Card.Body>
          )
          }
        }
      }


const mapStateToProps = state => ({
   appointmentsData: state.member.membersData.appointment,
   member: state.member,
   showAppointment: state.business.showAppointment
 })


export default connect(mapStateToProps, { evaluateAppointment })(ReservationInformation)
