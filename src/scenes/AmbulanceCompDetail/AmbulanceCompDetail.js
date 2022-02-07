import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from "react-router-dom";
import { Container,  Button} from 'react-bootstrap';
import AmbulanceDetailCard from '../companyDetail/components/AmbulanceDetailCard.js';
import AmbulanceInfoCard from './components/AmbulanceInfoCard.js';
import AmbulanceCommentCard from './components/AmbulanceCommentCard.js';
import AmbulanceVotingCard from './components/AmbulanceVotingCard.js';
import {ambulanceCompany} from '../../services/AmbulanceComp/AmbulanceCompAction';

class AmbulanceCompDetail extends React.Component {
  constructor(props){
   super(props)
   this.props.ambulanceCompany(this.props.match.params.provider);
  }
  render() {
    const {company, loading} = this.props.providersData;
    if(loading && !company){
      return (<div></div>);
    }
    else{
      return (
        <div>
          <AmbulanceDetailCard />
          <Container  className = "buttonDiv">
          <Link to={'/makereservation/'+this.props.providersData.pro_id} >
          <Button className = "orangeButton" style = {{marginTop : "5px"}}>Randevu Al</Button>
          </Link>
          </Container>
          <AmbulanceInfoCard />
          <Container className = "votingAndCommentContainerInside">
          <AmbulanceVotingCard />
          <AmbulanceCommentCard />
          </Container>

        </div>
      )
    }
  }
}


const WrappedAmbulanceCompDetail = withRouter(AmbulanceCompDetail);
const mapStateToProps = state => ({
  providersData : state.companyDetail.company,
})

export default connect(mapStateToProps, { ambulanceCompany })(WrappedAmbulanceCompDetail)
