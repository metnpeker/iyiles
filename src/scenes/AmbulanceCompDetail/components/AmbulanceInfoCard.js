import React from 'react';
import {connect} from 'react-redux';
import { Container, Col, Row} from 'react-bootstrap';
import '../ambulanceCompDetail.css';


class AmbulanceInfoCard extends React.Component {


  render () {
    const {provider_service} = this.props.providersData;
    let items = null;

    if(!provider_service){
      items= null;
    }else{
     items = this.props.providersData.provider_service.map((item,key) =>
     <Col key={item.id}> <li> {item.service.s_name} </li> </Col>
    )
    }
    return (
      <Container className = "ambulanceContainer" style = {{backgroundColor : "#F8F8F8"}}>
          <Row>
            <Col style = {{color : "#707070", padding:"3%"}} className = "colWithBorderRight"><h5 >Hakkımızda</h5><h6>{this.props.providersData.pro_name}, {this.props.providersData.pro_description} </h6></Col>
            <Col style = {{marginTop: "10%",color : "#707070", textAlign : 'center'}}><h5>Hizmetler</h5>
            <ul style = {{marginLeft : "5%"}}>
            {items}
            </ul>
            </Col>
          </Row>
      </Container>
    )
   }
  }

const mapStateToProps = state => ({
  providersData : state.companyDetail.company,
  loading : state.companyDetail.company.loading
})

export default connect(mapStateToProps, {})(AmbulanceInfoCard)
