import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { userReservation } from '../../../services/MakeReservation/MakeReservationAction';
import VotedStars from '../../../components/VotedStars.js'
import '../../../components/stars.css'
import '../companyDetailStyle.css';
class AmbulanceDetailCard extends Component {
  constructor(props){
   super(props)
   // this.props.userReservation(this.props.match.params.provider);
  }
  render() {
    // const {provider_service} = this.props.servicesList;
    if(!this.props.servicesList){
      return (<div>Loading services</div>);
    }
    else{
      const items = this.props.servicesList.map((item) =>
        <li key={item.id}>{item.service.s_name}</li>
      );
      const payments = this.props.paymentList.map((payment) =>
        <Col key={payment.id}> <li> {payment.pt_name} </li> </Col>
      );
    return (
        <Container className ="ambulanceContainer">
              <Row className = "ambulanceDetailRow">
                  <Col sm="12" md="4" className="right_border--orange my-auto"  >
                    <img style={{width: '180px', height: '180px'}} alt='logo' src= {global.MyVar + this.props.providersData.pro_logo} />
                    <h5 style={{color : '#707070' , fontSize :'20px', marginTop:'15px', fontWeight:'bold', fontFamily: 'Open Sans, sans-serif'}} >{this.props.providersData.pro_name}</h5>
                    <VotedStars rating={this.props.providersData.provider_rate[0] ? parseFloat(this.props.providersData.provider_rate[0].avarage_rate) : 0}/>
                  </Col>
                  <Col  sm="12" md="4" className="right_border--orange my-auto" >
                    <p style ={{color: '#707070', fontFamily: 'Open sans, sans-serif', marginBottom: '1em', fontSize:'15px', fontStyle:'italic'}}>
                      <FontAwesomeIcon className="map-maker-alt" icon="map-marker-alt" size = "2x"/>
                      {this.props.providersData.pro_address}
                    </p>
                    <div className ='workingHoursDiv'>
                    {this.props.workingHours[0].wh_start_time === this.props.workingHours[0].wh_end_time ? (  <h6>Çalışma Saatleri: <br /> 7/24  </h6>  ) : (
                    <h6>Çalışma Saatleri: <br /> {this.props.workingHours[0].wh_start_time} - {this.props.workingHours[0].wh_end_time} </h6>
                  )}
                  </div>
                    <div className ='paymentDiv'>
                    <h5 style = {{color : '#31D863' , fontSize : '35px', fontWeight:'bold'}}>{this.props.providersData.totalPrice.toFixed(2)} ₺</h5>
                    <h6 style = {{fontStyle: 'italic', fontSize:'15px', display: 'inline'}}> <span style={{fontWeight:'bold'}}> Ödeme Tipi: </span> {payments} </h6>
                    </div>
                  </Col>
                  <Col  sm="12" md="4" >
                    <p style = {{color : '#707070' , fontSize :'20px', fontWeight:'bold', fontFamily: 'Open Sans, sans-serif', textAlign: 'left'}}>
                       Neden {this.props.providersData.pro_name}?
                    </p>
                    <p style = {{color : '#000000' , fontSize :'15px', fontFamily: 'Open Sans, sans-serif', textAlign: 'left'}}>
                       {this.props.providersData.pro_short_desc}
                    </p>
                    <p style = {{color : '#707070' , fontSize :'20px', fontWeight:'bold', fontFamily: 'Open Sans, sans-serif', textAlign: 'left'}}>
                       Hizmetler
                    </p>
                    <ul style={{listStyle: 'none', textAlign: 'left'}}>
                      {items}
                    </ul>
                  </Col>
              </Row>
        </Container>
      )
    }
  }
}
const WrappedAmbulanceDetailCard = withRouter(AmbulanceDetailCard);
const mapStateToProps = state => ({
  makeReservation: state.makeReservation,
  providersData : state.makeReservation.makingReservation,
  servicesList : state.makeReservation.makingReservation.provider_service,
  paymentList : state.makeReservation.makingReservation.payment_type,
  workingHours: state.makeReservation.makingReservation.working_hour,

})
export default connect(mapStateToProps, { })(WrappedAmbulanceDetailCard)
