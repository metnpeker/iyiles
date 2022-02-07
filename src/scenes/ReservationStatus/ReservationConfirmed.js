import React from 'react';
import { Container} from 'react-bootstrap';
import ReservationResultConfirmed from './components/ReservationResultConfirmed';
import ConfirmingMessage from './components/ConfirmingMessage';
import AppCard from './components/AppCard';

class ReservationConfirmed extends React.Component {
  render () {
    return (
       <Container>
       <ConfirmingMessage />
       <ReservationResultConfirmed />
       <AppCard/> 
       </Container>
    )
  }
}
export default ReservationConfirmed;
