import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import routes from '../routes';
import { logoutUser } from './Login/LoginAction';


class PrivateRoute extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.logoutUser();
    this.props.history.push('/login')
  }

  checkBusinessUrl(){
      let locationArray = this.props.location.pathname.split('/');
      if(locationArray[1] ==='business'){
        return false
      }else{
        return true
      }
  }

  checkComponentLoad(role, auth){
    if((this.props.auth.userRole === role && this.props.auth.isAuthenticated) || (this.checkBusinessUrl() && !auth)){
      return true
    }else{
      return false
    }
  }

  checkUserRole(role, auth){
    if(this.props.auth.userRole !== role && this.props.auth.isAuthenticated && auth){
      return true
    }else{
      return false
    }
  }

  checkLogin(auth){
    if(!this.props.auth.isAuthenticated && auth){
      return true
    }else{
      return false
    }
  }

  render() {
    return (
      <Suspense fallback={this.loading()}>
          {routes.map((route, idx) => {
            return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    name={route.name}
                    exact={route.exact}
                    render={props =>{
                        if(this.checkComponentLoad(route.userRole, route.private)){
                          return <route.component {...props} key={this.props.location.key}/>
                        } else if (this.checkUserRole(route.userRole, route.private)) {
                          return <Redirect
                             to={{
                               pathname: "/",
                               state: { from: props.location }
                               }}
                              />
                       } else if(this.checkLogin(route.private)){
                       //login degil ve private bir sayfasya girmek istiyorsa login sayfasına yönlendiriyoruz
                          return <Redirect
                            to={{
                              pathname: "/login",
                              state: { from: props.location }
                              }}
                            />
                        }
                      }
                    }
                  />

            ) : (null);
          })}
      </Suspense>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(PrivateRoute)
