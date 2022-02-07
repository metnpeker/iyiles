import React from 'react';
import { Col, Row} from 'react-bootstrap';
import '../reservationStatus.css';
import done from '../images/done.png';
import { text } from '@fortawesome/fontawesome-svg-core';

class ConfirmingMessage extends React.Component {

  render (){
    const status = this.props.status;

    switch(status){
      case 1:
        return text;
    }
    return (
      <div className = "containerWithMessage">
      <Row className="justify-content-md-center">
         <Col md = {{span:1}}><img alt="confirmed" src= {done}/></Col>
         <Col md = {{span:8}}><h6>Sayın {this.props.appData.client.user.u_name+' '+this.props.appData.client.user.u_surname},</h6><h6> Ödemeniz <b>ONAYLANDI.</b></h6><h6> Rezervasyonunuz oluşturulmuştur.</h6></Col>
      </Row>
      <Row className="justify-content-md-center">
          <Col md={{span:9, offset: 2}}>
            <h6> <b>
            Rezervasyonunuz 24 saat içindeyse en kısa sürede, ileriki bir tarihte ise rezervasyonunuza 24 saat kala ambulans firması tarafından aranacaksınız. Firmaya ulaşmak için hesabınızdan rezervasyonunuza tıklayarak iletişim bilgilerini görebilirsiniz veya bize ulaşın sekmesinden bize yazabilirsiniz.
</b>
            </h6>
          </Col>
      </Row >
      </div>
    )
  }
}
export default ConfirmingMessage;
