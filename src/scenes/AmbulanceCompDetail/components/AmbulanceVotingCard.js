import React from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import '../ambulanceCompDetail.css';
import VotedStars from '../../../components/VotedStars.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ambulanceCompany} from '../../../services/AmbulanceComp/AmbulanceCompAction';

class AmbulanceVotingCard extends React.Component{

  constructor(props){
   super(props)
     this.state = {
       open: false
     }
 }

  render() {
  if(this.props.loading)
  {
    return <p>loading</p>;
  }else{
    return (
      <Container className = "votingAndCommentContainer">
        <Row className ="ambulanceRatingRow">
          <Col style = {{marginTop: 10}}>
              <VotedStars  rating = {parseFloat(this.props.providersData.provider_rate[0].avarage_rate)} />
              <h6 style = {{fontStyle : 'italic', color :"#707070"}}>Görüş Sayısı ve Ortalama Puan </h6></Col>
          <Col>
              <FontAwesomeIcon size="2x" icon={faClock}/>
              <h6 style = {{color :"#707070"}}>Zamanlama</h6>
              <VotedStars rating = {parseFloat(this.props.providersData.avarage_rate[0].avarage_rate)} />
          </Col>
          <Col>
              <FontAwesomeIcon size="2x" icon={faCheckCircle}/><h6 style = {{color :"#707070"}}>Kalite/İlgi</h6>
              <VotedStars rating = {parseFloat(this.props.providersData.avarage_rate[1].avarage_rate)}  />
          </Col>
          <Col>
              <FontAwesomeIcon size="2x" icon={faThumbsUp}/><h6 style = {{color :"#707070"}}>Temizlik</h6>
              <VotedStars rating = {parseFloat(this.props.providersData.avarage_rate[2].avarage_rate)}  />
          </Col>
       </Row>
      </Container>

       );
     }
    }
  }


const mapStateToProps = state => ({
  loading : state.companyDetail.loading,
  providersData : state.companyDetail.company,
})

export default connect(mapStateToProps, {ambulanceCompany})(AmbulanceVotingCard)
