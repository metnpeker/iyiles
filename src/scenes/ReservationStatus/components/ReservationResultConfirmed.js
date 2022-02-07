import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row, Card, CardDeck, Button } from 'react-bootstrap';
import '../reservationStatus.css';
import { reservationResultData } from '../../../services/reservationStatus/ReservationStatusAction';

class ReservationResult extends React.Component {

    constructor(props){
     super(props);
     this.props.reservationResultData();
    }
    genderText(gender){
    let genderText = null;
    switch (gender) {
      case 0:
        genderText = 'Erkek';
        return genderText;
      case 1:
          genderText = 'Kadın';
          return genderText;
      default:
          return null;
    }
  }

  render() {
    return (
      <Container className="reservationInformationWithShadow">
        <Row style={{ textAlign: "center" }}>
          <Col md={{ span: 8, offset: 2 }} lg={{span:8,offset: 1}}>
            <h5> Rezervasyon Bilgileriniz </h5>
          </Col>
          <Col md={{ span: 8, offset: 2 }}>
            <h5> {this.props.appointmentResultData.provider.pro_name} - {this.props.appointmentResultData.service.s_name} </h5>
          </Col>
        </Row>
        <CardDeck style={{ margin: "2%" }}>
          <Card className="reservationInfoCard">
            <Card.Body>
              <Card.Title className="underlinedTitle">Adres Bilgileri</Card.Title>
              <Card.Text className="resultCardTextFont">
               Nereden : <span style={{fontWeight:'normal'}}> {this.props.appointmentResultData.app_from} </span>
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                Nereye : <span style={{fontWeight:'normal'}}> {this.props.appointmentResultData.app_to}   </span>
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                Tarih ve Saat: <span style={{fontWeight:'normal'}}>  {this.props.appointmentResultData.app_appointment_time}  </span>
              </Card.Text>
            </Card.Body>

          </Card>
          <Card className="reservationInfoCard">
            <Card.Body>
              <Card.Title className="underlinedTitle">Hasta Yakını Bilgileri</Card.Title>
              <Card.Text className="resultCardTextFont">
                {this.props.appointmentResultData.client.user.u_name} {this.props.appointmentResultData.client.user.u_surname}
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                {this.genderText(this.props.appointmentResultData.client.c_gender)}
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                {this.props.appointmentResultData.client.user.u_phone}
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                {this.props.appointmentResultData.client.user.email}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="reservationInfoCard">
            <Card.Body>
              <Card.Title className="underlinedTitle">Hasta Bilgileri</Card.Title>
              <Row>
              <Col>
                <Card.Text className="resultCardTextFont">
                  {this.props.appointmentResultData.patient.pa_name} {this.props.appointmentResultData.patient.pa_surname}
                </Card.Text>
                <Card.Text className="resultCardTextFont">
                  {this.props.appointmentResultData.patient.pa_birthdate}
                </Card.Text>
                <Card.Text className="resultCardTextFont">
                  Kilo : <span style={{fontWeight:'normal'}}> {this.props.appointmentResultData.patient.pa_weight}  </span>
                </Card.Text>
                <Card.Text className="resultCardTextFont">
              {/* Ek Bilgiler : {this.props.appointmentResultData.patient.pa_additional_information} */}
                </Card.Text>
              </Col>
              <Col>
              <Card.Text className="resultCardTextFont">
                {this.genderText(this.props.appointmentResultData.client.c_gender)}
              </Card.Text>
              </Col>
            </Row>
            </Card.Body>
          </Card>
          <Card className = "reservationInfoCard">
            <Card.Body>
              <Card.Title className ="underlinedTitle">Ödeme Bilgileri</Card.Title>
              <Card.Text className="resultCardTextFont">
                Ödeme Tipi :<span style={{fontWeight:'normal'}}> {this.props.appointmentResultData.payment_type.pt_name} </span>
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                Tutar : <span style={{fontWeight:'normal'}}> {this.props.appointmentResultData.app_price} TL </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
        <Row style = {{marginTop :"30px"}}>
            <Col md={{ offset: 9}}> <Button style={{color:'white', backgroundColor:'#F68A25', borderColor:'#F68A25'}}>ARA</Button></Col>
        </Row>
      </Container>

    )
  }
}
const mapStateToProps = state => ({
  appointmentResultData: state.reservation.appointmentsData
})
export default connect(mapStateToProps, { reservationResultData })(ReservationResult)
