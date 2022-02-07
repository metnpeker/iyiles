import React from 'react';
import { connect } from 'react-redux';
import { Container} from 'react-bootstrap';
import ReservationPending from './ReservationPending';
import ReservationConfirmed from './ReservationConfirmed.js';
import ReservationRejected from './ReservationRejected';
import { reservationResultData } from './../../services/reservationStatus/ReservationStatusAction';

class ReservationSelectDisplay extends React.Component {

  constructor(props){
    super(props)
    this.props.viewReservationPage();
   }

  render () {
    if(this.props.loading){
      return (<div></div>);
    }
    else{
    return (
      <Container>
      {(() => {

        switch (2) {
          case 1: return (<div> <ReservationPending /> </div>);
          case 2: return (<div> <ReservationConfirmed /> </div>);
          case 3: return(<div> <ReservationRejected /> </div>);
          default: return (<p> Rezervasyon Bulunamadı. </p>);

        }
      })()}
      </Container>
     )
   }
  }
}
const mapStateToProps = state => ({
  appointments: state.appointments
})
export default connect(mapStateToProps, {reservationResultData})(ReservationSelectDisplay)
