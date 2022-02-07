import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Script from 'react-load-script';
import store from './store';
import PrivateRoute from './services/PrivateRoute.js';
import setAuthToken from './services/Login/SetAuthToken';
import './components/provider/Layout.css'

//set token from cookie
setAuthToken();

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  componentDidMount (){
        window.$crisp=[];
        window.CRISP_WEBSITE_ID="41223682-30b8-4640-b017-931206fabee4";
      (function() {
        var d = document;
        var s = d.createElement("script");

        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
   };

  constructor() {
      super();
      //Setting up global variable
      global.MyVar = 'https://api.iyiles.com/';
      this.handleScriptLoad = this.handleScriptLoad.bind(this);
    }

  handleScriptLoad() {
        /*global google*/
  console.log('handleScriptLoad');
  }
  render(){
    return(
      <Provider store={store}>
        <div className='App main-row'>
          <Script url="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async="" onLoad={this.handleScriptLoad} />
          <HashRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route path="/" render={props => <PrivateRoute {...props}/>} />
              </Switch>
            </React.Suspense>
          </HashRouter>
        </div>
      </Provider>
    )
  }
}

export default App;
