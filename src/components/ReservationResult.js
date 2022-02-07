import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

class ReservationResult extends React.Component {
  render() {
    return (
      <Container style = {{ lineHeight : 0.5}} className="withShadow">
          <Row className = "withMargin">
            <Col md={{ span:5, offset: 4 }}><h5> Rezervasyon Bilgileriniz </h5></Col>
          </Row>
            <Row className="justify-content-md-center withMargin">
               <Col md ={{offset: 1}}><h6 style ={{textDecorationLine: 'underline',textDecorationColor: '#F68A25' }}>Ambulans Firması</h6></Col>
               <Col><h6 style ={{textDecorationLine: 'underline',textDecorationColor: '#F68A25' }}>Ambulans Tipi</h6></Col>
               <Col><h6 style ={{textDecorationLine: 'underline',textDecorationColor: '#F68A25' }}>Yön</h6></Col>
            </Row>
            <Row className="justify-content-md-center">
               <Col md ={{offset :1}}><h6 style ={{textDecorationLine: 'underline', textDecorationColor: '#F68A25' }}>Nereden:</h6><p>Adres</p></Col>
               <Col><h6><FontAwesomeIcon className="exchange-alt" icon="exchange-alt" size = "3x"/></h6></Col>
               <Col><h6 style ={{textDecorationLine: 'underline', textDecorationColor: '#F68A25' }}>Nereye:</h6><p>Adres</p></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={{ offset:1 }} style ={{textDecorationLine: 'underline', textDecorationColor: '#F68A25' }}><h6>Hasta Yakını Bilgileri:</h6></Col>
                <Col md={{ offset:3 }} style ={{textDecorationLine: 'underline',textDecorationColor: '#F68A25'}}><h6>Hasta Bilgileri:</h6></Col>
            </Row >
            <Row className="justify-content-md-center">
                <Col md={{ offset:1 }}><p>Ad-Soyad:</p></Col>
                <Col md={{ offset:3 }}><p>Ad-Soyad:</p></Col>
            </Row >
            <Row className="justify-content-md-center">
                <Col md ={{offset :1}}><p>Telefon Numarası</p></Col>
                <Col md={{ offset: 3 }}><p>Doğum Tarihi: </p></Col>
            </Row >
            <Row className="justify-content-md-center">
                  <Col md ={{offset :1}}><p>E-Posta Adresi</p></Col>
                  <Col md={{ span: 1, offset: 4 }}><p>Cinsiyet:</p></Col>
                  <Col><p>Kilo:</p></Col>
              </Row >
              <Row className="justify-content-md-center">
                  <Col md={{ span: 4, offset: 8 }}><p>Ek Bilgiler: </p></Col>
              </Row>
            <Row className="justify-content-md-center">
               <Col md ={{offset:1}}><h6 style ={{textDecorationLine: 'underline',textDecorationColor: '#F68A25' }}>Ödeme Bilgileri:</h6></Col>
            </Row>
            <Row className="justify-content-md-center">
               <Col md ={{offset:1}}><h6>Tutar:</h6></Col>
               <Col><h6>Ödeme Tipi:</h6></Col>
               <Col><h6>Kart Bilgileri:</h6></Col>
            </Row>
      </Container>
    )
  }
}
export default ReservationResult;
