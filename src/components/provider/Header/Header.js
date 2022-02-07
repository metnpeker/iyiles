import React, {Component} from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../services/Login/LoginAction'
import {Link} from 'react-router-dom';
import './Header.css'
import {Navbar, Nav} from 'react-bootstrap';

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from './img/iyiles-logo-footer.png'

class Header extends Component {

constructor(props,context) {
  super(props, context);
  this.logoutHandler = this.logoutHandler.bind(this);
}
  logoutHandler(){
    this.props.logoutUser();
  }

  render(){
    return (
      <div className = "headerComponent">
       <Link to={'/business/home'}>
        <img src={logo}  style={{paddingTop:'2%'}} alt="logo" className = "headerLogo" />
       </Link>
        <Navbar className="navbarStyle justify-content-space-around">
        <Nav className=" " >
        <Nav.Item>
          <Nav.Link href="#/business/home"> Anasayfa </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  href="#/business/profile">Profilim</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  href="#/business/ratecomment">Değerlendirmeler</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  href="#/business/services">Hizmetler</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  href="#/business/faq">S.S.S</Nav.Link>
        </Nav.Item>
        <Nav.Item>
         <Nav.Link href='#/business/' onClick={this.logoutHandler} className="logout-user"> Çıkış Yap <FontAwesomeIcon icon={faSignOutAlt}/>  </Nav.Link>
        </Nav.Item>
  </Nav>
        </Navbar>
    </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.member.loading
})
export default connect(mapStateToProps,{logoutUser})(Header)
