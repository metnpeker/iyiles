import React from 'react';
import AmbulanceDetailCard from './components/AmbulanceDetailCard.js';
import ReservationInfo from './components/ReservationInfo.js';
import RelativeInfo from './components/RelativeInfo.js';
import PatientInfo from './components/PatientInfo.js';
import { Container } from 'react-bootstrap';


class CompanyDetail extends React.Component {
  render() {
    return (

      <Container style= {{backgroundColor: '#FFFFFF' , marginTop :30}}>
          <AmbulanceDetailCard/>
          <ReservationInfo/>
          <PatientInfo/>
          <RelativeInfo/>
      </Container>
    )
  }
}
export default CompanyDetail;
