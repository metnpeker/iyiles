import React, { Component } from 'react';
import { Container, Button, Col, Form, Row, ButtonToolbar} from 'react-bootstrap';
import './passwordStyle.css';

class PasswordPage extends Component {

  render() {
    return (
      <Container>
      <Container className ="information-Container">
        <Row className = "informationDetailRow">
          <Col md="12" className ="colWithBorderRight">
         <h3 style={{color : '#707070', fontSize:'20px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold', margin: '20%'}}>
           Şifre Oluştur
         </h3>
         </Col>
      <Col md="6" className ="colWithBorderRight">
      <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Control type="email" placeholder="Şifrenizi Giriniz..." className="mb-3" />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Control type="password" placeholder="Şifrenizi Tekrar Giriniz..." className="mb-3" />
    </Form.Group>
    <Form.Group controlId="formBasicChecbox">
    </Form.Group>
    <ButtonToolbar style={{fontSize:'12px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold', float:'right', margin:'40%', marginTop: '0px 0px 10px'}}>
    <Button variant="secondary">Kaydet</Button>
    </ButtonToolbar>
  </Form>
   </Col>
  </Row>
</Container>
  </Container>
    );
  }
}

export default PasswordPage;
