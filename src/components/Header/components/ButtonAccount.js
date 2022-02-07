import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import HeaderComponentStyle from '../HeaderComponentStyle.css';
import { loginUser } from '../../../services/Login/LoginAction';


class ButtonAccount extends Component {
  constructor(props){
    super(props)
  }
  redirectLogin() {
    if(this.props.auth.isAuthenticated && this.props.auth.userRole==="client"){
       return  <Link to="/userProfile">
                  <Button className = "buttonStyle" type="submit">Hesabım</Button>
               </Link>;
    }else if(this.props.auth.isAuthenticated && this.props.auth.userRole==="provider"){
      return   <Link to="/business/home">
                  <Button className = "buttonStyle" type="submit">Hesabım</Button>
               </Link>;
    }
  }

  render() {
    return (
      <div>
          {this.redirectLogin()}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { loginUser }) (ButtonAccount);
