import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import '../rateComment.css';
import VotedStars from '../../../../components/VotedStars.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faThumbsUp, faClock} from "@fortawesome/free-solid-svg-icons";
import { getCommentList } from '../../../../services/provider/commentRate/CommentRateAction';

class CompanyComment extends React.Component {
  constructor(props){
   super(props)
   this.props.getCommentList();
  }
  render () {   
    if( this.props.loading && !this.props.rateComments){
        return <p>loading..</p>;
      }
      else {
        const rateCommentItems = this.props.comments.map(
          (data,id) => {
    return (
      <Container key={id} className = "comment-container">
      <Row>
          <Col  style={{paddingRight:'20px'}}>
             <h2 className = "name-circle">{data.client.user.u_name.length < 1
                 ? `${data.client.user.u_name}`
                 : `${data.client.user.u_name.substring(0, 1)}`} </h2>
          </Col>
          <Col>
             <FontAwesomeIcon icon={faCheckCircle}/>
              <VotedStars rating = {data.rate[0].r_rate} />
          </Col>
          <Col>
             <FontAwesomeIcon icon={faClock} />
             <VotedStars rating = {data.rate[1].r_rate}  />
          </Col>
          <Col>
             <FontAwesomeIcon icon={faThumbsUp}/>
             <VotedStars rating = {data.rate[2].r_rate}  />
          </Col>
          </Row>
          <Row>
          <Col className="comment-text" >
             <p>{data.cm_description}</p>
          </Col>
          </Row>

      </Container>

  )
    }
      )
      return (
        <Container className = "rate-container">{rateCommentItems}</Container>
        );
          }
            }
              }

  const mapStateToProps = state => ({
  rateComments: state.business.commentRateData.commentListInfo,
  loading : state.business.commentRateData.loading

  })

export default connect(mapStateToProps,{ getCommentList })(CompanyComment)
