import React from 'react';
import VotedStars from '../../../../components/VotedStars.js';
import {connect} from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import '../rateComment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {providerProfile} from '../../../../services/provider/ProfilePage/ProfilePageAction'
import {faCheckCircle, faThumbsUp, faClock} from "@fortawesome/free-solid-svg-icons";

class CompanyRate extends React.Component {

constructor(props){
  super(props)
  this.props.providerProfile();
}

  render () {
    return (
    <div>
       <div className = "rate-container">
        <Row className ="rating-row">
           <Col xl="1">
                  <p className="big-title" >Firmanızın Puanları</p>
           </Col>
           <Col>
                <p className="rate-title" > Ortalama </p>
                  <VotedStars rating={parseFloat(this.props.profileProviderData.provider_rate[0].avarage_rate)}/>
                  <p className="rate-avarage"> {Math.round(this.props.profileProviderData.provider_rate[0].avarage_rate)} </p>
           </Col>
           <Col>
                <p className="rate-title" > Zamanlama <FontAwesomeIcon icon={faClock}/> </p>
                  <VotedStars rating = {parseFloat(this.props.profileProviderData.avarage_rate[0].avarage_rate)}/>
                  <p className="rate-avarage"> {Math.round(this.props.profileProviderData.avarage_rate[0].avarage_rate)}</p>
           </Col>
           <Col>
                <p className="rate-title">Kalite/İlgi <FontAwesomeIcon icon={faThumbsUp}/> </p>
                   <VotedStars rating= {parseFloat(this.props.profileProviderData.avarage_rate[1].avarage_rate)}/>
                   <p className="rate-avarage">  {Math.round(this.props.profileProviderData.avarage_rate[1].avarage_rate)} </p>

           </Col>
           <Col>
                <p className="rate-title">Temizlik <FontAwesomeIcon icon={faCheckCircle}/> </p>
                   <VotedStars rating= {parseFloat(this.props.profileProviderData.avarage_rate[2].avarage_rate)}/>
                   <p className="rate-avarage"> {Math.round(this.props.profileProviderData.avarage_rate[2].avarage_rate)} </p>
           </Col>
        </Row>
       </div>
       </div>

     )
       }
         }

  const mapStateToProps = state => ({
    profileProviderData : state.business.providerProfile.providerProfileInformation

  })

  export default connect(mapStateToProps, {providerProfile} ) (CompanyRate);
