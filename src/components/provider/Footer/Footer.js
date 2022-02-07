import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Container} from 'react-bootstrap';
import './Footer.css'

class Footer extends Component {
  render(){
    return(
     <div className = "footerComponent"><p>Copyright © İyileş 2020 </p><p>

Versiyon 1.0</p></div>
    )}

}
export default Footer;
