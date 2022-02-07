import React, { Component } from 'react';
import ButtonRegister from '../../../components/Header/components/ButtonRegister'
import ButtonLogin from '../../../components/Header/components/ButtonLogin'
import logo from '../Footer/img/iyiles-logo.png'


class Header extends Component {
  render() {
    return (
    <div className= "header">
        <img src={logo} width={150} height={150}  alt="logo" className="logo" />
        <nav >
            <ul>
             <ButtonLogin />
             <ButtonRegister />
            </ul>
        </nav>
    </div>
    )
  }
}

export default Header;
