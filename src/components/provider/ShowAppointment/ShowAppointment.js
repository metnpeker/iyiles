import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import {connect} from 'react-redux';
import moment from 'moment';
import 'moment/locale/tr';
import {evaluateAppointment, rejectReason} from '../../../services/provider/showAppointment/showAppointmentAction';
import './ShowAppointment.css';
import rejected from './images/rejected.jpg';
import confirmed from './images/confirmed.jpg';
import Buttons from './components/AcceptRejectButtons';


class ShowAppointment extends Component {
   constructor(props){
      super(props);
      this.evaluateAppointment = this.evaluateAppointment.bind(this);
   }
   evaluateAppointment(status, reason){
      if(status==="accept"){
         this.props.all.app_status = 2;
         this.props.evaluateAppointment(this.props.all);
      } else if(status==="reject"){
        console.log(reason);
         this.props.all.app_status = 3;
         this.props.all.app_reason_rejection = reason;
         this.props.rejectReason(this.props.all);
      } else {

      }
   }


   alertRender (){
     if(this.props.showAppointment.appointmentSuccess){
       return(
         <Alert variant="success">
                   <p>
                   Randevu onaylanmıştır. Randevu onaylandı bilgisi müşteriye iletilmiştir. Durumunu sıradaki randevular kısmından takip edebilirsiniz.
                   </p>
         </Alert>
       )
     }else if(this.props.showAppointment.appointmentRejectSuccess){
         return(
           <Alert variant="warning">
                     <p>
                     Randevu reddedilmiştir.
                     </p>
           </Alert>
         )
       }
   if(this.props.showAppointment.appointmentFailed){
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

      const now = moment();
      const appTime = moment(this.props.all.app_appointment_time,'DD-MM-YYYY HH:mm');
      const hoursLeft = appTime.diff(now, 'hours', true);

      return (
         <div>
        {this.alertRender()}
            <div className="show-box" >
              <Row>
                 <Col lg="3" xl="4" className="show-col">
                    <p className="show-title"> 1-) Detaylı Tarih ve Adres Bilgileri </p>
                 </Col>
              </Row>
              <Row>
                 <Col className="show-col">
                    <p> <span className="show-title"> Nereden: </span>{this.props.all.app_from} </p>
                 </Col>
                 <Col className="show-col">
                    <p> <span className="show-title"> Nereye: </span> {this.props.all.app_to} </p>
                 </Col>
              </Row>
            </div>

            <div className="show-box">
              <Row>
                 <Col lg="5" className="show-col">
                   <p className="show-title" > 2-) Hasta Bilgileri </p>
              <Row>
                 <Col>
                   <p>{this.props.all.patient.pa_name +' '+this.props.all.patient.pa_surname }</p>
                   <p>{this.props.all.patient.pa_birthdate}</p>
                 </Col>
                 <Col>
                   <p>{this.props.all.patient.pa_weight}</p>
                   <p>{this.props.all.patient.pa_gender ? 'Erkek' : 'Kadın'}</p>
                 </Col>
              </Row>
              <Row>
              <Col  xs={12}>
                <p> <span className="show-title"> Hastanın Durumu: </span> {this.props.all.patient.pa_additional_information}</p>
              </Col>
              </Row>
                 </Col>
                 <Col  className="show-col">
                    <p className="show-title"> 3-) Hasta Yakını Bilgileri </p>
                    <p>{this.props.all.client.user.u_name +' '+ this.props.all.client.user.u_surname}</p>
                    {hoursLeft < 24  ? <React.Fragment> <p className="show-last"> {this.props.all.client.user.u_phone} </p> </React.Fragment> : null}
                 </Col>
              </Row>
              </div>

              <div className="show-box">
                <Row>
                   <Col lg="3" xl="4" className="show-col">
                      <p className="show-title"> 4-) Ödeme Bilgileri</p>
                   </Col>
                </Row>
                <Row style={{marginLeft:"10%"}}>
                   <Col lg="3" xl="4" className="show-col">
                      <p> {this.props.all.payment_type.pt_name} </p>
                   </Col>
                   <Col md="4" lg="3" xl="4" className="show-col">
                      <p> <b> Toplam Tutar: </b> {this.props.all.app_price} TL </p>
                   </Col>
                   <Col md="4" lg="3" xl="4" className="show-col">
                    {/*  <p> Ödeme Durumu:
                       <img src={confirmed} alt="PaymentConfirmed" style={{height:'40px', weight:'40px'}}/>
                       <img src={rejected} alt="PaymentRejected" style={{height:'40px', weight:'40px'}}/>
                      </p> */}
                   </Col>
                </Row>
                </div>
                {this.props.all.app_status === 1 ? <Buttons acceptButton={this.evaluateAppointment}/> : null}
            </div>
      )
   }
}
const mapStatetoProps = state => ({
   status: state.business.appointments,
   showAppointment: state.business.showAppointment
})
export default connect(mapStatetoProps,{evaluateAppointment, rejectReason})(ShowAppointment);
