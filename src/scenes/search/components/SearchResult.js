import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { Row, Col, Spinner} from 'react-bootstrap';
import ButtonCall from './ButtonCall';
import ButtonMoreInfo from './ButtonMoreInfo';
import VotedStars from '../../../components/VotedStars.js'
import { userReservation } from '../../../services/MakeReservation/MakeReservationAction';



const searchLogo = {
  width:'80px',
  height: '80px',
  border: '1px solid #bfbfbf'
}

class SearchResult extends Component {
  constructor(props) {
    super(props)
    this.state={
      actualDist: null,
      startingDist: null,
      count: 0,
    }
  }

  isNull () {
    if(this.props.data.comment.length){
      if(this.props.data.comment[this.props.data.comment.length-1].cm_description == null){
        return (  <p>"{this.props.data.comment[1].cm_description.length < 100
           ? `${this.props.data.comment[1].cm_description}`
           : `${this.props.data.comment[1].cm_description.substring(0, 100)}...`}"</p>)}
    else{
      return (<p>"{this.props.data.comment[this.props.data.comment.length-1].cm_description.length < 100
          ? `${this.props.data.comment[this.props.data.comment.length-1].cm_description}`
          : `${this.props.data.comment[this.props.data.comment.length-1].cm_description.substring(0, 100)}...`}"</p>)
      }
    }
  }


   selectProvider() {
     this.props.userReservation(this.props.data);
   }
  render() {
    return (
      <div>
        <Row className="result-row" >
          <Col  lg="4" xl="3" className="search-result-name">
            <img src= {global.MyVar + this.props.data.pro_logo} alt="Logo" style= {searchLogo}/>
            <p>{this.props.data.pro_name}</p>
            <VotedStars rating={this.props.data.provider_rate[0] ? parseFloat(this.props.data.provider_rate[0].avarage_rate) : 0}/>
          </Col>
          <Col  md="6" lg="3" xl="4" className="search-result-review">
          {this.isNull()}
          </Col>
          {this.props.data.totalPrice && !this.props.loading ?
            <React.Fragment>
              <Col  md="6" lg="1" xl="2" className="search-result-price">
                <p>{Math.round(this.props.data.totalPrice)} TL </p>
              </Col>
              <Col  md="12" lg="4" xl="3" className="search-result-buttons">
                {this.props.auth.isAuthenticated ?
                  <Link to={'/makereservation/'+this.props.id} onClick={()=>this.selectProvider()}>
                    <ButtonCall />
                  </Link>
                :
                  <Link to={'/notRegistered/'+this.props.id}  onClick={()=>this.selectProvider()}>
                      <ButtonCall />
                  </Link>
                }
                  <Link to={'/companydetail/'+this.props.id} >
                    <ButtonMoreInfo />
                  </Link>
              </Col>
            </React.Fragment>
            : this.props.loading ?
              <Col  md="6" lg="3" xl="4" className="search-result-buttons">
                <Spinner animation="grow" size="md" style={{ width:'3rem', height:'3rem'}} variant="warning" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </Col>
              : ''
          }
        </Row>
     </div>
   )
  }
 }
const mapStateToProps = state => ({
  commentList : state.companyDetail.commentData,
  companyDetail: state.companyDetail,
  auth: state.auth,
  provider: state.provider,
  userFilterData: state.provider.userFilterData
})

export default connect(mapStateToProps, {userReservation})(SearchResult)
