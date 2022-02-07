import React from 'react';
import {Link}  from 'react-router-dom';
import { Container, Col, Row, Button, Form, InputGroup, FormControl, ButtonToolbar } from 'react-bootstrap';
import '../checkoutStyle.css';

class Checkout extends React.Component {

  render() {
     return (
      <Container>
        <Container className ="checkContainer col-12">
        <Row style={{width: '90%', margin: '0 auto'}}>
          <Col xs="6" style={{paddingTop: '2em'}}>
           <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
           Ödeme Bilgileri
           </p>
            <hr />
          {/*  <DropdownButton id="dropdown-item-button" title="Ödeme Şekliniz">
               <Dropdown.Item as="button">Visa</Dropdown.Item>
               <Dropdown.Item as="button">Master Card</Dropdown.Item>
               <Dropdown.Item as="button">Nakit</Dropdown.Item>
            </DropdownButton> */}
           </Col>
           <Col xs="6" style={{position: "relative"}}>
            <p style={{ position: 'absolute',bottom:'0',marginBottom: '0',color : '#707070', fontSize:'20px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
            Toplam Tutar: <span style={{color : '#31D863', fontSize:'20px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}> 250 TL </span>
            </p>
           </Col>
           </Row>

     <Container className ="checkoutContainer">
        <Row className = "checkoutDetailRow">
          <Col xs="6" md="4">
          <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
          Kart Bilgilerini Giriniz
          </p>
          <hr />
          <InputGroup>
            <FormControl className="mb-3"
         aria-label="Default"
         aria-describedby="inputGroup-sizing-default"
         placeholder="Kart Numarası"/>
         </InputGroup>
         <InputGroup>
           <FormControl className="mb-3" style={{borderColor:'#F68A25', fontSize:"14px"}}
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        placeholder="Kart Üzerindeki İsim-Soyisim"/>
        </InputGroup>
         </Col>
          <Col className="card-date">
             <Row>
               <Col>
                <p style={{color : '#707070', fontSize:'12px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
                Son Geçerlilik Tarihi
                </p>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control style={{borderColor:'#F68A25'}} as="select" className="mb-3">
                      <option>Ay</option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                  </Form.Control>
                </Form.Group>
               </Col>
              <Col className="card-year">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control style={{borderColor:'#F68A25'}} as="select" className="mb-3">
                      <option>Yıl</option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                  </Form.Control>
                 </Form.Group>
              </Col>
                <Col>
                 <Form.Group>
                   <Form.Label style={{borderColor:'#F68A25', color : '#707070', fontSize:'12px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
                   CVC
                  </Form.Label>
                 <FormControl className="mb-3"
             aria-label="Default"
             aria-describedby="inputGroup-sizing-default"
             placeholder=""/>
               </Form.Group>
            </Col>
         </Row>
      </Col>
   </Row>
</Container>
        <Col  style={{margin: '40px 0px 40px'}}>
          <Link to='/reservation/pending'>
          <ButtonToolbar style={{fontSize:'12px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold', justifyContent: 'flex-end'}}>
          <Button variant="secondary">İşlemi Tamamla</Button>
          </ButtonToolbar>
          </Link>
        </Col>
    </Container>
</Container>
 )
  }
    }


export default Checkout;
