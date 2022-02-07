import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../HeaderComponentStyle.css'
import { Button } from 'react-bootstrap';



class ButtonLogin extends Component {
  render() {
    return (
      <Link to="/login/1" >
        <Button className= "loginButton" type="submit">GİRİŞ Yap</Button>
      </Link>
    )
  }
}

export default ButtonLogin;
