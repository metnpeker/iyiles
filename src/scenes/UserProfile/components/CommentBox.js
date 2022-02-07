import React from 'react';
import { connect } from 'react-redux';
import '../userProfile.css';
import { Col, Row, Button, InputGroup, FormControl, Form, Alert} from 'react-bootstrap';
import Rater from 'react-rater';
import '../../../components/stars.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ambulanceCompany } from '../../../services/AmbulanceComp/AmbulanceCompAction';
import { addNewComment,resetCommentBox } from '../../../services/CommentBox/CommentAction';


class commentBox extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.props.ambulanceCompany(this.props.match.params.provider);
    this.state = {
      open: false,
      loading:'',
      time: 0,
      quality: 0,
      hygiene: 0,
      comment:'',
      error:'',
      isFormValid: null
    };
    this.props.resetCommentBox();
    this.onSubmitHandler=this.onSubmitHandler.bind(this);
    this.rater=this.rater.bind(this);
    this.onChangeHandler=this.onChangeHandler.bind(this);
    this.validateForm =this.validateForm.bind(this);
  }

rater(e, rateName){
  switch(rateName){
    case 'time':

      this.setState({time: e}, ()=>{});
      break;
    case 'quality':

        this.setState({quality: e}, ()=>{});
        break;
    case 'hygiene':

        this.setState({hygiene: e}, ()=>{});
        break;
    default:

  }
  this.validateForm();
}
validateForm(){
  const isTimeValid = this.state.time !==null;
  const isQualityValid = this.state.quality !==null;
  const isHygieneValid = this.state.hygiene !==null;
  const isFormValid = (isTimeValid && isQualityValid && isHygieneValid );
  this.setState({
    isFormValid: isFormValid
  });
}
onChangeHandler(e){
  const comment = e.target.value;
  this.setState((state) => ({...this.state, comment: comment}));

}
onSubmitHandler(e){
  e.preventDefault();
  const fields = {
    ratingsArray : {
      time: this.state.time,
      quality : this.state.quality,
      hygiene : this.state.hygiene
    },
    cm_description : this.state.comment,
    provider_id : this.props.match.params.provider
  }

  if(this.state.isFormValid){
    this.props.addNewComment(fields);
  };


  //post request with commentInfo
}
alertRender (){
  if(this.props.isSuccess){
    return(
      <Alert variant="success">
                <p>
                Yorumunuz başarıyla gönderilmiştir. Teşekkürler.
                </p>
      </Alert>
    )
  }
if(this.props.isFailed){
  return(
    <Alert variant="danger">
        <p>
        Yorumunuz gönderilemedi. Lütfen tekrar deneyiniz.
        </p>
      </Alert>
  )
  }
}

  render (){

    return(

  <div className = "commentCard">

    <Row md={{ span: 6, offset: 3 }} style={{textAlign:'center'}}>
       <p>
         Hizmeti Nasıl Buldunuz?
       </p>
    </Row>
       <hr style={{marginTop:'1%'}}/>
    <Row>
      <Col style={{marginLeft:'5%', marginTop:'5%'}}>
        <img src={global.MyVar + this.props.providerSingleData.pro_logo} style={{border:'1px solid #57F1FF'}} width={100} height={100} alt="Logo" />
      </Col>
      <Col style={{marginRight:'10%', marginTop:'5%'}}>
        <p>{this.props.providerSingleData.pro_name}</p>
        <Form>
        <Row>
        <FontAwesomeIcon icon={faClock} />
        <p style={{marginLeft:'5%', marginRight:'3%'}}> Zamanlama </p>
          <Rater style={{marginTop:'2%'}} rating={this.state.time}  onRate={({rating})=> this.rater(rating, 'time')}  total={5} interactive={true} />
        </Row>
        <Row>
        <FontAwesomeIcon icon={faCheckCircle} />
        <p style={{marginLeft:'5%', marginRight:'3%'}}> Kalite/İlgi </p>
          <Rater style={{marginLeft:'8%', marginTop:'2%'}} rating={this.state.quality} onRate={({rating})=> this.rater(rating, 'quality')} total={5} interactive={true} />
        </Row>
        <Row>
        <FontAwesomeIcon icon={faThumbsUp} />
        <p style={{marginLeft:'5%', marginRight:'3%'}}> Temizlik </p>
          <Rater style={{marginLeft:'10%', marginTop:'2%'}} rating={this.state.hygiene} onRate={({rating})=> this.rater(rating, 'hygiene')} total={5} interactive={true} />
        </Row>
        </Form>
      </Col>
    </Row>
    <Row style={{marginTop:'3%'}}>
    <p> Yorumunuz </p>
    </Row>
    <Form onSubmit={this.onSubmitHandler}>
    <Row>
    <InputGroup>
        <FormControl as="textarea"  style={{height:'150px'}}
         aria-label="With textarea"
         name="comment"
         placeholder="Hizmet ile ilgili tecrübenizi yazınız..."
         onChange={this.onChangeHandler}
         value={this.state.comment}
        />
      </InputGroup>
    </Row>
     <Row>
       <Button type="submit" onSubmit= {this.onSubmitHandler} variant="secondary" size="lg" block style={{color:'white', backgroundColor:'#F68A25', borderColor:'#F68A25'}}>
          Gönder
       </Button>
      {this.alertRender()}
     </Row>
    </Form>

  </div>
)
 }
  }

  const mapStateToProps = state => ({
     providerSingleData: state.companyDetail.company,
     isFailed : state.providerData.isCommentFailed,
     isSuccess : state.providerData.isCommentSuccess
   })



export default connect ( mapStateToProps,{ambulanceCompany, addNewComment,resetCommentBox})(commentBox);
