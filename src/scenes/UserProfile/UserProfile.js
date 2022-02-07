import React from 'react';
import { connect } from 'react-redux';
import {  Card, Accordion, Row, Col } from 'react-bootstrap';
import { getMemberForm } from '../../services/UserProfile/UserAction';
import { logoutUser } from '../../services/Login/LoginAction'
import PatientInformation from './components/PatientInformation.js';
import MembershipInformation from './components/MembershipInformation.js';
import ChangePassword from './components/ChangePassword.js';
import ReservationInformation from './components/ReservationInformation.js';
import ReservationEndedInformation from './components/ReservationEndedInformation.js';
import { Link } from 'react-router-dom';
import { faChevronDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './userProfile.css';


class UserProfile extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      memberName:{},
      open: false
    };
    this.logoutHandler = this.logoutHandler.bind(this);
    this.props.getMemberForm();
  }
logoutHandler(){
  this.props.logoutUser();
}

  render() {
    const {user} = this.props.membersData;
    if(this.props.loading || !user )
    {
      return <p>loading</p>;
    }else{
      const { open } = this.state.open;
      return (
     <Row className="profile-layout">
      <Col lg={2} md={3} sm={8} xs={8} style={{margin: '0 auto', height:'200px',padding:'0'}}>
             <div style={{height:'100%',borderRadius: '5px', border:'1px solid #F68A25',boxShadow: '0px 0px 28px -1px #F68A25', backgroundColor:'white'}}>
             <h2 className = "nameInCircle" style = {{marginLeft : "40%"}}>{this.props.membersData.user.u_name.length < 1
                 ? `${this.props.membersData.user.u_name}`
                 : `${this.props.membersData.user.u_name.substring(0, 1)}`}</h2>

              <p style={{textAlign:'center',marginTop:'1em',textTransform:'capitalize', fontFamily:'Open sans,serif'}}>merhaba {this.props.membersData.user.u_name} </p>
           <Link to="/" onClick={this.logoutHandler}>
              <div style={{textAlign:'center', textTransform:'capitalize'}}>
                 Çıkış Yap
               <FontAwesomeIcon icon={faSignOutAlt}/>
              </div>
            </Link>

        </div>
      </Col>
      <Col md={9}>
          <Accordion className = "accordionHeader" defaultActiveKey="0">
              <Card>
                <Accordion.Toggle className = "accordionHeader" as={Card.Header} eventKey="0">
                        <h4 style = {{textAlign : 'left'}}>Gelecek Rezervasyon Bilgileri <FontAwesomeIcon icon={faChevronDown}/> </h4>
                </Accordion.Toggle>
                <Accordion.Collapse className = "collapseElementContainer" eventKey="0">
                    <ReservationInformation/>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle className = "accordionHeader" as={Card.Header} eventKey="1">
                        <h4 style = {{textAlign : 'left'}}>Tamamlanan Rezervasyon Bilgileri <FontAwesomeIcon icon={faChevronDown}/> </h4>
                </Accordion.Toggle>
                <Accordion.Collapse className = "collapseElementContainer" eventKey="1">
                    <ReservationEndedInformation/>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle className = "accordionHeader" as={Card.Header} eventKey="2">
                    <h4 style = {{textAlign : 'left'}}>Üyelik Bilgileri <FontAwesomeIcon icon={faChevronDown}/> </h4>
                </Accordion.Toggle>
                <Accordion.Collapse className = "collapseElementContainer" eventKey="2">
                    <MembershipInformation/>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle className = "accordionHeader" as={Card.Header} eventKey="3">
                    <h4 style = {{textAlign : 'left'}}>Hasta Bilgileri <FontAwesomeIcon icon={faChevronDown}/> </h4>
                </Accordion.Toggle>
                <Accordion.Collapse className = "collapseElementContainer" eventKey="3">
                    <PatientInformation/>
                </Accordion.Collapse>
              </Card>
               {/* <Card>
              <Accordion.Toggle className = "accordionHeader" as={Card.Header} eventKey="4">
                <h4 style = {{textAlign : 'center'}}>Kredi Kartı</h4>
                 </Accordion.Toggle>
              <Accordion.Collapse  className = "collapseElementContainer" eventKey="4">
               <CreditCardInformation />
                </Accordion.Collapse>
               </Card>  */}
            <Card>
                <Accordion.Toggle  className = "accordionHeader"as={Card.Header} eventKey="5">
                    <h4 style = {{textAlign : 'left'}}>Şifre Değiştir <FontAwesomeIcon icon={faChevronDown}/> </h4>
                </Accordion.Toggle>
                <Accordion.Collapse className = "collapseElementContainer" eventKey="5">
                    <ChangePassword />
                </Accordion.Collapse>
              </Card>
          </Accordion>
      </Col>
      </Row>

      );
      }
    }
  }



const mapStateToProps = state => ({
   loading: state.member.loading,
   membersData: state.member.membersData
 })


export default connect(mapStateToProps, { getMemberForm, logoutUser })(UserProfile);
