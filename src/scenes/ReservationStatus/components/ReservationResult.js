import React from 'react';
import { Col, Row, Card, CardDeck } from 'react-bootstrap';
import '../reservationStatus.css';

class ReservationResult extends React.Component {
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
    if(this.props.loading){
      return <p>loading...</p>;
    }
    else{
    return (
      <div className="reservationInformationWithShadow">
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h5> </h5>
          </Col>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h5>Rezervasyon Bilgileriniz</h5>
          </Col>
        </Row>
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h5> {this.props.appData.provider.pro_name} - {this.props.appData.service.s_name} </h5>
          </Col>
        </Row>
        <CardDeck style={{ margin: "2%" }}>
          <Card className="reservationInfoCard">
            <Card.Body>
              <Card.Title className="underlinedTitle">Adres Bilgileri</Card.Title>
              <Card.Text className="resultCardTextFont">
               Nereden : <span style={{fontWeight:'normal'}}> {this.props.appData.app_from} </span>
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                Nereye : <span style={{fontWeight:'normal'}}> {this.props.appData.app_to}   </span>
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                Tarih ve Saat: <span style={{fontWeight:'normal'}}>  {this.props.appData.app_appointment_time}  </span>
              </Card.Text>
            </Card.Body>

          </Card>
          <Card className="reservationInfoCard">
            <Card.Body>
              <Card.Title className="underlinedTitle">Hasta Yakını Bilgileri</Card.Title>
              <Card.Text className="resultCardTextFont">
                {this.props.appData.client.user.u_name} {this.props.appData.client.user.u_surname}
              </Card.Text>
              <Card.Text className="resultCardTextFont">
              {this.genderText(this.props.appData.client.c_gender)}
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                {this.props.appData.client.user.u_phone}
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                {this.props.appData.client.user.email}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="reservationInfoCard">
            <Card.Body>
              <Card.Title className="underlinedTitle">Hasta Bilgileri</Card.Title>
              <Row>
              <Col>
                <Card.Text className="resultCardTextFont">
                  {this.props.appData.patient.pa_name} {this.props.appData.patient.pa_surname}
                </Card.Text>
                <Card.Text className="resultCardTextFont">
                  {this.props.appData.patient.pa_birthdate}
                </Card.Text>
                <Card.Text className="resultCardTextFont">
                  Kilo : <span style={{fontWeight:'normal'}}> {this.props.appData.patient.pa_weight}  </span>
                </Card.Text>
                <Card.Text className="resultCardTextFont">
              {/* Ek Bilgiler : {this.props.appData.patient.pa_additional_information} */}
                </Card.Text>
              </Col>
              <Col>
              <Card.Text className="resultCardTextFont">
                {this.genderText(this.props.appData.client.c_gender)}
              </Card.Text>
              </Col>
            </Row>
            </Card.Body>
          </Card>
          <Card className = "reservationInfoCard">
            <Card.Body>
              <Card.Title className ="underlinedTitle">Ödeme Bilgileri</Card.Title>
              <Card.Text className="resultCardTextFont">
                Ödeme Tipi :<span style={{fontWeight:'normal'}}> {this.props.appData.payment_type.pt_name} </span>
              </Card.Text>
              <Card.Text className="resultCardTextFont">
                Tutar : <span style={{fontWeight:'normal'}}> {this.props.appData.app_price} TL </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>

    );
  }
  }
}
export default (ReservationResult);
