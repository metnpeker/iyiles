import React, { Component, Button } from 'react'
import Container from 'react-bootstrap/Container';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { loginUser,logoutUser } from '../../services/Login/LoginAction';
import logo from './img/iyiles-logo-footer.png'
import './FooterComponentStyle.css'


class FooterComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.logoutHandler = this.logoutHandler.bind(this);
  }
  logoutHandler(){
  this.props.logoutUser();
  }
  render() {
      const  isLoggedIn = this.props.auth.isAuthenticated;
    return (

    <Container className="footer">
      <Row >
        <Col className="list-columns" lg={{ span: 3, order:2,offset :1 }} md={{ span: 3, order:2,offset:1 }} xs={{ span: 3, order:2,offset : 2 }}>
          <Row>
            <li className="amb-link list-unstyled ">
            { isLoggedIn ? ( <Link to = "/login/1" onClick={this.logoutHandler}>
            <p style={{marginBottom:'2px'}}>Ambulans Girişi</p></Link>
           ): (<Link to="/login/1" >
              <p>Ambulans Girişi</p>
            </Link> )
          }
            </li>
          </Row>
          <Row >
            <Col  xs="6" md={{ order:1,span:3 }} xs={{ order:1 }} className="list-columns">
              <ul className="list-link">
                <li className="list-unstyled">
                { isLoggedIn ? ( <Link to = "/login/1" onClick={this.logoutHandler}>
                <p> Çıkış Yap </p>
                   </Link>
               ): (<Link to="/login/1" >
                  <p>Hasta Girişi</p>
                </Link> )}
                </li>
                <li className="list-unstyled">
                  <a href="http://blog.iyiles.com/" target="_blank" >Blog</a>
                </li>

              </ul>
            </Col>
            <Col xs="6" md={{ order:2, offset:1 }} xs={{ order:2 }} className="list-columns">
              <ul className=" list-link">
                <li className="list-unstyled">
                  <a href="#!">Gizlilik Sözleşmesi</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Kullanıcı Sözleşmesi</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Üyelik Sözleşmesi</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">Kişisel Veri Koruma</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>

        <Col sm="12"  lg="3" xs="12" md={{span:3, order:2,offset:1 }}  >
          <Row className="label-name">
          <Link to={'/'}>
          <img  src={logo} width={200}  alt="Logo"  />
          </Link>
          </Row>
          <Row className="social">
            <p>Bizi Takip Edin!</p>
            <div>
              <a href = "" className="fb-ic">
                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>
              <a href = "" className="ins-ic">
                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>
              <a href = "" className="ytube-ic">
                <i className="fab fa-youtube fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>
            </div>
            </Row>
        </Col>
          <Col md={{span:3, order:3,offset : 0 }} className="text-center download" >
            <h5>Mobil Uygulamalarımız Çok Yakında !</h5>
            <img src="https://www.hallmanagementgroup.com/wp-content/uploads/2018/10/google-play-app-store-badges-5926dec63df78cbe7eaf4f9e.jpg" alt="AppStoreBadges"  width="40%"/>
            <img src="https://upload.wikimedia.org/wikipedia/tr/thumb/d/d3/QR_kodu.jpeg/200px-QR_kodu.jpeg" alt="QR kodu" width="40%"/>
            <p style = {{marginBottom : "0"}}>  Copyright © İyileş 2020 </p>
            <p style={{fontSize:'12px'}}>  Versiyon 1.0 </p>

          </Col>
      </Row>
    </Container>

    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { loginUser,logoutUser})(FooterComponent)
