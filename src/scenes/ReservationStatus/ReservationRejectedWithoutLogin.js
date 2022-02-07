import React from 'react';
import { Container, Col, Row, Button} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CarouselCompany from './components/CarouselCompany.js';
import RejectedMessageWithoutLogin from './components/RejectedMessageWithoutLogin.js';

class ReservationRejectedWithoutLogin extends React.Component {
  render () {
    return (
      <Container>
       <RejectedMessageWithoutLogin />
       <CarouselCompany />
       <Col style= {{marginTop:"5%"}} md={{ offset: 5,span:12}}><Button className ="orangeButton"><b>Tüm Ambulansları Gör</b></Button></Col>
       </Container>
    )
  }
}
export default ReservationRejectedWithoutLogin;
