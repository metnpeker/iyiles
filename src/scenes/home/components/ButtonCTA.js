import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


class ButtonCTA extends Component {
  render() {
    return (
      <div>
          <Link to="/providers">
            <Button className="button-cta" type="submit">Hemen Bul!</Button>
          </Link>
        
      </div>
    )
  }
}
export default ButtonCTA;