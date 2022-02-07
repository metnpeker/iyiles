import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../HeaderComponentStyle.css'
import { Button } from 'react-bootstrap';


class ButtonRegister extends Component {
  render() {
    return (
        <Link to="/login/2">
          <Button className = "registerButton" type="submit">Kaydol</Button>
        </Link>
    )
  }
}

export default ButtonRegister;
