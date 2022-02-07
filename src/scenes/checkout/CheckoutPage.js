import React from 'react';
import { Container } from 'react-bootstrap';
import Checkout from './components/Checkout.js';
import AmbulanceDetailCard from '../companyDetail/components/AmbulanceDetailCard.js';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';

class CheckoutPage extends React.Component {

  render() {
     return (

       <Container>

    <AmbulanceDetailCard/>
    <Checkout/>


       </Container>

)
 }
   }

export default CheckoutPage;
