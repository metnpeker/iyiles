import React from 'react';
import {Container} from 'react-bootstrap';
import CarouselCompany from './components/CarouselCompany.js';
import RejectingMessage from './components/RejectingMessage.js';

class ReservationRejected extends React.Component {
  render () {
    return (
      <Container>
        <RejectingMessage />
          <CarouselCompany />

      </Container>
    )
  }
}
export default ReservationRejected;
