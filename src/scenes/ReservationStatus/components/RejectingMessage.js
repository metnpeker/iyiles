import React  from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row} from 'react-bootstrap';
import '../reservationStatus.css';
import rejected from '../images/rejected.png';

class RejectingMessage extends React.Component {

  render (){
    return (
      <Container className = "containerWithMessage">
      <Row className="justify-content-md-center">
         <Col md = {{span:1,}}><img alt="img" src= {rejected}/></Col>
         <Col md = {{span:8}}><h6>Sayın {this.props.appData.client.user.u_name+' '+this.props.appData.client.user.u_surname},</h6><h6> Talebiniz ambulans firması tarafından <b>İPTAL EDİLMİŞTİR.</b></h6></Col>
      </Row>
      <Row className="justify-content-md-center">
          <Col md={{span:10, offset: 2}}><h6><b>Tarafınızdan herhangi bir ödeme işlemi gerçekleştirilmemiştir.

Rezervasyon ayrıntılarınıza en uygun diğer firmalardan hızlıca rezervasyon oluşturmak için aşağıdan Çağır butonunu kullanabilir veya tüm ambulansları listeleyebilirsiniz.

</b></h6></Col>
      </Row >
      </Container>
    )
  }
}
export default RejectingMessage;
