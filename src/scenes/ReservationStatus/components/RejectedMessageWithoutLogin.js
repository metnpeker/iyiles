import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row} from 'react-bootstrap';
import '../reservationStatus.css';
import rejected from '../images/rejected.png';

class RejectedMessageWithoutLogin extends React.Component {
  render (){
    return (
      <Container className = "containerWithMessage">
      <Row className="justify-content-md-center">
         <Col md = {{span:1,}}><img alt="rejectedMessage" src= {rejected}/></Col>
         <Col md = {{span:8}}><h6>Sayın İsim Soyisim,</h6><h6> Talebiniz ambulans firması tarafından <b>İPTAL EDİLMİŞTİR.</b></h6> <h6>Tarafınızdan herhangi bir <b>ÖDEME ALINMAMIŞTIR.</b></h6></Col>
      </Row>
      <Row className="justify-content-md-center">
          <Col md={{span:10, offset: 2}}><h6><b>Talep ettiğiniz gün ve saatte diğer ambulanslara hızlıca rezervasyon oluşturmak aşağıdaki tablodan Çağır’a basabilir veya tüm ambulansların listelerine ulaşabilirsiniz.</b></h6></Col>
      </Row >
      </Container>
    )
  }
}
export default RejectedMessageWithoutLogin;
