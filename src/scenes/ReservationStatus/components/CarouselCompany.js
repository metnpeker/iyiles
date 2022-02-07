import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Container } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import {Link} from 'react-router-dom';
import '../../../components/stars.css'
import VotedStars from '../../../components/VotedStars.js';
import ambulance from '../images/ambulance.png'
import { getProviderCarousel } from '../../../services/reservationStatus/ReservationStatusAction';

class CarouselCompany extends React.Component {

  constructor(props){
   super(props);
   this.props.getProviderCarousel();
  }

  render () {
    if(this.props.reservation.loading){
      return <p>loading...</p>;
    }
    else{
      const carouselItems = this.props.carouselData.map(
        (data,id) => {
          return (

            <div key={id} className="item ">

     <Card className = "ambulanceCard">
        <Card.Img className="justify-content-md-center" style = {{width:75, margin:"auto"}} variant="top" img src ={ambulance} />
      <Card.Body>
        <Card.Title>
          {data.pro_name}
        </Card.Title>
          <Card.Text>
            <VotedStars />
          </Card.Text>
          <Card.Text>
             {data.total_comment_relation.provider_id} yorum
          </Card.Text>
           <Link to='/makereservation/{id}'>
            <Button style={{color:'white', backgroundColor:'#F68A25', borderColor:'#F68A25'}}>Çağır</Button>
           </Link>
      </Card.Body>
     </Card>
        </div>

          );
        }
      )
           return (
             <Container className = "owlCarouselAtReservation">
          <div style = {{marginBottom:"1%"}}><h5 >Size En Uygun Ambulans Firmaları</h5></div>
            <OwlCarousel
              className="owl-theme"
              loop
              center
              margin = {30}
              items={4}
          >
            {carouselItems}

            </OwlCarousel>
          </Container>

          );
       }
     }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    reservation: state.reservation,
    carouselData: state.reservation.carouselData
  })

export default connect(mapStateToProps, { getProviderCarousel })(CarouselCompany)
