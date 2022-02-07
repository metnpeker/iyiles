import React from 'react';

import { connect } from 'react-redux';

import { getCommentList } from '../../../services/provider/commentRate/CommentRateAction';
import CompanyRate from './components/CompanyRate.js';
import CompanyComment from './components/CompanyComment.js';
import Pagination from './../../../components/provider/Pagination/Pagination';

class RateComment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentPage: 1,
      perPage: 10,
    }
    this.props.getCommentList();
   }
    paginate =(number) =>{
     this.setState({
       currentPage: number
     },()=>{
      window.scrollTo(0, 0);
     })
   }
  render () {
    const comments = this.props.rateComments;
    const indexOfLastComment = this.state.currentPage * this.state.perPage;
    const indexOfFirstComment = indexOfLastComment - this.state.perPage;
    const currentComments = comments.reverse().slice(indexOfFirstComment, indexOfLastComment);

    return (
      <div className=" main-wrapper">
        <CompanyRate />
        <CompanyComment comments={currentComments} />
        <Pagination perPage={this.state.perPage} total={comments.length} paginate={this.paginate} currentPage={this.state.currentPage}/>
       </div>
    )
  }
}
const mapStateToProps = state => ({
  rateComments: state.business.commentRateData.commentListInfo,
  loading : state.business.commentRateData.loading

  })

export default connect(mapStateToProps,{ getCommentList })(RateComment)
