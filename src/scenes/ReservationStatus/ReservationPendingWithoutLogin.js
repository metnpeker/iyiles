import React from 'react';
import { Container, Col, Row, Button} from 'react-bootstrap';
import ReservationResult from './components/ReservationResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PendingMessage from './components/PendingMessage';

class ReservationPendingWithoutLogin extends React.Component {
  render () {
    return (
      <Container>
      <PendingMessage />

      <div className = "smsConfirmDiv">SMS ve Mail olarak gönderdiğimiz “linke tıklayarak” şifrenizi belirleyiniz.</div>


      <ReservationResult />
      </Container>
    )
  }
}
export default ReservationPendingWithoutLogin;
