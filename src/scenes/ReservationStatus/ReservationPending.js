import React from 'react';
import {Container} from 'react-bootstrap';
import ReservationResult from './components/ReservationResult';
import AppCard from './components/AppCard';
import PendingMessage from './components/PendingMessage';


class ReservationPending extends React.Component {


  render () {
    return (
      <Container>
       <PendingMessage/>
       <ReservationResult/>
      <AppCard/>


      </Container>
    )
  }
}

export default ReservationPending
