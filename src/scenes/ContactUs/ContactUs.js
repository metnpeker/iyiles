import React, { Component } from 'react'
import './contactStyle.css';
import { Form, Container, Button, ButtonToolbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
library.add(faChevronRight)


 class ContactUs extends Component {
    render() {
        return (
            <Container className="contact-wrapper">
            <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control className="input-border--orange" type="name" placeholder="İsim-Soyisim" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control className="input-border--orange" type="email" placeholder="Mail Adresi" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control className="input-border--orange" type="subject" placeholder="Konu" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control className="input-border--orange" as="textarea" rows="5" placeholder="Mesaj"/>
            </Form.Group>
            
                <Button style={{fontSize:'16px', fontFamily:'Open sans, sans-serif', fontWeight:'Bold',display: 'block',margin: '0 auto', height: '3em', width: '30%'}} variant="secondary">Gönder 
                <FontAwesomeIcon style={{color: 'white', marginLeft: '1em'}}icon="chevron-right" />
                </Button>
            
          </Form>
          </Container>
          
        )
    }
}

export default ContactUs;