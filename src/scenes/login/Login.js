import React,{ Component } from 'react';
import './LoginStyle.css';
import { Tabs, Tab, Container, Row, Col} from 'react-bootstrap';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';



library.add(fab, faAngleRight)

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      activeTab: props.match.params.type
    };

    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidUpdate(prevProps) {
    if(this.props.match.params.type !== prevProps.match.params.type){
      this.setState({ activeTab: this.props.match.params.type})
    }
}
  render() {

    return (

        <Container className="form-container">
           <Row>
             <Col className="loginTabs" md={{ span: 12, offset: 2}} lg={{ span: 6, offset: 3}}>
                <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} className="justify-content-center">
                   <Tab eventKey={1} title="GİRİŞ YAP">
                      <LoginComponent />
                   </Tab>
                   <Tab eventKey={2} title="KAYDOL">
                      <RegisterComponent />
                   </Tab>
                 </Tabs>
               </Col>
           </Row>
         </Container>

      );
    }
    handleSelect(selectedTab) {
       this.setState({
         activeTab: selectedTab
       });
    }
  }

  export default Login
