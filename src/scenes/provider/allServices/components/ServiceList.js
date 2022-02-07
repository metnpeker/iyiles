import React from 'react';
import '../allServices.css';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ServiceList extends React.Component {

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
  render() {
   return (

     <div className="services-box">
       <Row style={{textAlign:"center", alignItems: "center"}}>
        <Col st>
           <p> {this.props.name} {this.props.surname} </p>
        </Col>
        <Col>
           <p> {this.props.serviceType}  </p>
        </Col>
        <Col>
        <p>{this.props.from}</p>
        <FontAwesomeIcon icon="long-arrow-alt-down" />
        <p>{this.props.to}</p>
        </Col>
        <Col>
           <p> {this.props.date} </p>
         </Col>
         <Col>
           <p> {this.props.price} TL </p>
         </Col>
         <Col>
           <p> {this.statusText(this.props.status)} </p>
         </Col>
        </Row>
     </div>
   )
  }
}
export default ServiceList;
