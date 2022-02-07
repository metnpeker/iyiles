import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Row} from 'react-bootstrap';
import '../reservationStatus.css';
import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AppCard extends React.Component {

  render (){

    return (

      <div className = "reservationAppCard" style={{fontSize:'1rem', fontWeight:'bold', textAlign:'center'}}>
      <Row className="justify-content-md-center">
      <Col  md = {{span:1}} style={{marginTop:'2%', marginBottom:'2%'}} >
      <FontAwesomeIcon size="5x" icon={faMobileAlt} />
      </Col>
      <Col  md = {{span:8}} style={{marginTop:'4%'}}>
       Sağlık360 Her Zaman Yanında! <br/>
       Sağlık 360 Mobil Uygulaması Çok Yakında Sizlerle!
       </Col>
       </Row>
      </div>
    )
  }
}


export default  AppCard;
