import React from 'react';
import {connect} from 'react-redux';
import { Container, Col, Row, Button} from 'react-bootstrap';
import '../ambulanceCompDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VotedStars from '../../../components/VotedStars.js'
import {Link} from 'react-router-dom';
import { ambulanceCompany} from '../../../services/AmbulanceComp/AmbulanceCompAction';


class AmbulanceDetailCard extends React.Component {
  constructor(props){
   super(props);
  }

  render() {
    const {total_comment, loading} = this.props.providersData;

    if(loading || !total_comment){
        return <p>loading..</p>;
      }
      else {
        const payments = this.props.paymentList.map((payment,id) =>
        <Col key={payment.id}> <li> {payment.pt_name} </li> </Col>
         );
    return (
        <Container className ="ambulanceContainer">
              <Row className = "ambulanceDetailRow">
                  <Col className ="colWithBorderRight">
                      <h5> {this.props.providersData.pro_name} </h5><br />
                      <p style ={{color: '#707070', marginTop:'10px'}}><FontAwesomeIcon className="map-maker-alt" icon="map-marker-alt" size = "2x"/>{this.props.providersData.pro_address}</p>
                      <div className ='workingHoursDiv'>
                       {this.props.workingHours[0].wh_start_time === this.props.workingHours[0].wh_end_time ? (  <h6>Çalışma Saatleri: <br /> 7/24  </h6>  ) : (
                      <h6>Çalışma Saatleri: <br /> {this.props.workingHours[0].wh_start_time} - {this.props.workingHours[0].wh_end_time} </h6>
                    )}
                    </div>
                  </Col>
                  <Col className ="colWithBorderRight">
                     <VotedStars rating={parseFloat(this.props.providersData.provider_rate[0].avarage_rate)} /><br />
                      <p style ={{color: '#707070' , fontSize:20 , fontStyle : 'italic'}}>{this.props.providersData.total_comment[0].total_comment} Değerlendirme</p>
                      <img alt='logo' style={{width: '180px', height: '180px'}} src= {global.MyVar + this.props.providersData.pro_logo} />
                  </Col>
                  <Col style = {{marginTop:40}}>
                  <h5 style = {{color : '#31D863' , fontSize : 25}}>ÜCRET</h5>
                  <h6 style = {{fontStyle: 'italic', marginTop:40}}> <span style={{fontWeight:'bold'}}> Ödeme Tipi: </span> {payments}</h6>
                  <Link to={'/makereservation/'+this.props.providersData.pro_id} >
                  <Button className = "orangeButton">Randevu Al</Button>
                  </Link>
                  </Col>
              </Row>
        </Container>
        )
    }
  }
}
const mapStateToProps = state => ({
  providersData : state.companyDetail.company,
  workingHours: state.companyDetail.company.working_hour,
  paymentList: state.companyDetail.company.payment_type,

})

export default connect(mapStateToProps, { ambulanceCompany })(AmbulanceDetailCard)
