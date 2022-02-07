
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import {Link} from 'react-router-dom';
import ButtonLogin from './components/ButtonLogin'
import ButtonRegister from './components/ButtonRegister'
import ButtonAccount from './components/ButtonAccount'
import logo from '../Footer/img/iyiles-logo.png'


import './HeaderComponentStyle.css'


const NavStyle= {
  float: 'right',
  display: 'absolute',
  marginRight: '2em'
}

const ulStyle = {
  margin: '1em'
}


class HeaderComponent extends Component {
  constructor(props) {
    super();
  }
  render(){
    let button;
    let  button2;
    let headerStyle;
    let {location} =this.props;
    switch(location.pathname){
      case '/': {
        headerStyle = {
          height: '0',
          position: 'absolute',
          width: '100%'
        }
        break
      }
      case '/providers': {
        headerStyle = {
          borderRadius: '0',
          width: '100%',
          height: '20vh'
        }
        break
      }
      default:{
        headerStyle = {
          marginBottom: '-25vh'
        }
      }

    }
    if(this.props.auth.isAuthenticated){
      button = <ButtonAccount />;

    }else{
      button = <ButtonLogin  /> ;
      button2 = <ButtonRegister />;
    }
    return (
    <div  className="HeaderComponentWrapper" style = {headerStyle}>
        <Link to={'/'}>
        <img src={logo} alt="logo" className= "logoStyle" />
        </Link>
        <nav style= {NavStyle} >
            <ul style= {ulStyle}>
              {button}
              {button2}
            </ul>
        </nav>
    </div>
    )
  }
}
const WrappedHeader = withRouter(HeaderComponent);
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { })(WrappedHeader)
