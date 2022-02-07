import React from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import '../ambulanceCompDetail.css';
import VotedStars from '../../../components/VotedStars.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getCommentCarousel } from '../../../services/AmbulanceComp/AmbulanceCompAction';
import Pagination from '../../../components/provider/Pagination/Pagination';

class AmbulanceCommentCard extends React.Component{

  constructor(props){
   super(props)
   this.state = {
     currentPage: 1,
     perPage: 5,
   }
  }
  paginate =(number) =>{
   this.setState({
     currentPage: number
   },()=>{
    window.scrollTo(0, 0);
   })
 }


  render() {
    if(this.props.companyDetail.loading || !this.props.companyComments){
        return <p>loading..</p>;
      }
      else {
        const allComments = this.props.companyComments;
        const indexOfLastComment = this.state.currentPage * this.state.perPage;
        const indexOfFirstComment = indexOfLastComment - this.state.perPage;
        const currentComments = allComments.slice(indexOfFirstComment, indexOfLastComment);
        const companyCommentItems = currentComments.map(
          (data,id) => {
            return (
            <div>
              <Container className = "votingAndCommentContainer">
                  <Row>
                      <Col><h2 className = "nameInCircle" style = {{marginLeft : "30%"}}>{data.client.user.u_name.length < 1
                          ? `${data.client.user.u_name}`
                          : `${data.client.user.u_name.substring(0, 1)}`}</h2></Col>
                      <Col style = {{marginTop : "2%"}}><FontAwesomeIcon size="2x" icon={faCheckCircle}/><VotedStars rating = {data.rate[0].r_rate}/></Col>
                      <Col style = {{marginTop : "2%"}}><FontAwesomeIcon size="2x" icon={faClock}/> <VotedStars rating = {data.rate[1].r_rate} /></Col>
                      <Col style = {{marginTop : "2%"}}><FontAwesomeIcon size="2x" icon={faThumbsUp}/> <VotedStars  rating = {data.rate[2].r_rate}/></Col>
                  </Row>
                  <Row>
                    <Col><p>{data.cm_description}</p></Col>
                  </Row>
              </Container>
            </div>
            )
          }
        )
        return (
          <React.Fragment>
            <div>{companyCommentItems}</div>
            <Pagination perPage={this.state.perPage} total={allComments.length} paginate={this.paginate} currentPage={this.state.currentPage}/>
          </React.Fragment>
          );
    }
  }
}
const mapStateToProps = state => ({
  companyComments: state.companyDetail.company.comment,
  companyDetail: state.companyDetail,


})
export default connect(mapStateToProps, { getCommentCarousel })(AmbulanceCommentCard)
