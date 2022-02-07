import React from 'react';
import { connect } from 'react-redux';
import { getHomeComment } from '../../../services/homeComments/HomeAction';
import Rater from 'react-rater';
import VotedStars from '../../../components/VotedStars.js'
import OwlCarousel from 'react-owl-carousel';
import '../../../components/stars.css';
import 'owl.carousel/dist/assets/owl.carousel.css';

let reviewStyle = {
  textAlign: 'center',
  boxShadow:'0px 15px 50px -30px #f68a25',
  borderRadius:'5px',
  minHeight: '170px',
  minWidth: '300px',
  margin: '0 auto',
  marginTop: '30px',
  backgroundColor: 'white',
  padding: '20px 10px',
  width :' 60%',


}
let userStyle = {
  textAlign: 'center',
  width: '50px',
  height: '50px',
  margin: '0 auto',
  backgroundColor: '#f68a25',
  color: 'white',
  borderRadius: '50%',
  lineHeight: '50px',

}



class ReviewCarousel extends React.Component {

  constructor(props){
   super(props)
   this.props.getHomeComment();
  }

  render () {
    const {commentsData} = this.props.comments;
    if( !commentsData.length){
        return <p>loading..</p>;
      }
    else{
      const commentItems = commentsData.map(
        (data,id) => {
          return (
      <div key={id} className="item" >
    <div>
          <div>
            <h3 style={userStyle}>{data.client.user.u_name.length < 1
                ? `${data.client.user.u_name}`
                : `${data.client.user.u_name.substring(0, 1)}`}
        </h3>
              <div style = {reviewStyle}>
                 <p style={{fontWeight: 'bold', fontSize:'20px', color:'grey'}}> {data.provider.pro_name}</p>
                    <VotedStars rating={parseFloat(data.avarage_rate[0].avarage_rate)} />
                 <p>
                   {data.cm_description}
                </p>
              </div>
           </div>
         </div>
      </div>
            )
          }
        )

           return (
              <div className="carousel-wrapper" >
                <OwlCarousel
                    loop
                    nav
                    navText ={ ['<i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>','<i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i>']}
                    center
                    items= {1}
                    margin={100}
                    responsiveClass
                    responsive={
                {0:{
                    items:1
                },
            }}
              >
              {commentItems}

                 </OwlCarousel>
              </div>
          );
       }
     }
   }



const mapStateToProps = state => ({
  auth: state.auth,
  comments: state.comments,
  commentsData: state.comments.commentsData

})
export default connect(mapStateToProps, { getHomeComment })(ReviewCarousel)
