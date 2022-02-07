import React from 'react';
import '../allServices.css';
import { Col, Row } from 'react-bootstrap';


class ServiceTitle extends React.Component {

  render() {
   return (
     <div className="title-cont">
       <Row className="justify-content-md-center">
        <Col>
           <p> Ad Soyad </p>
        </Col>
        <Col>
           <p> Ambulans Tipi </p>
        </Col>
        <Col>
           <p> Yer-Yön </p>
        </Col>
        <Col>
           <p> Tarih-Saat </p>
         </Col>
         <Col>
           <p> Fiyat </p>
         </Col>
         <Col>
           <p> Durum </p>
         </Col>
        </Row>
     </div>

   )
  }
}
export default ServiceTitle;
