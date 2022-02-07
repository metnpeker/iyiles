import React from 'react';
import '../userProfile.css';
import { Col, Row, Form, Card, InputGroup, FormControl, Button } from 'react-bootstrap';

class CreditCardInformation extends React.Component {
  render(){
    return (
        <Card.Body>
          <Form>
             <Row className = "checkoutDetailRow">
               <Col xs="6" md="4">
               <p style={{color : '#707070', fontSize:'15px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold', textDecoration : "underline"}}>
               Kart Bilgilerini Giriniz
               </p>

               <InputGroup>
                 <FormControl className="mb-3 formBox"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Kart Numarası"/>
              </InputGroup>
              <br/>
              <InputGroup>
                <FormControl className="mb-3 formBox" style={{fontSize:"14px"}}
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
                       <Form.Control  as="select" className="mb-3 formBox">
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
                       <Form.Control as="select" className="mb-3 formBox">
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
                        <Form.Label style={{color : '#707070', fontSize:'12px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold'}}>
                        CVC
                       </Form.Label>
                      <FormControl className="mb-3 formBox"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder=""/>
                    </Form.Group>
                 </Col>
                 </Row>
                 </Col>
        </Row>
        <Button type="submit" className="float-right orangeButtonUserProfile" >
             İşlemi Tamamla
           </Button>
          </Form>
        </Card.Body>


    )
  }
}
export default CreditCardInformation;
