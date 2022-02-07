import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfilePage.css';
import {Tabs, Tab} from 'react-bootstrap';
import ProfileForm from './components/ProfileForm';
import ServicePricing from '../servicePricing/ServicePricing';
import StationPage from '../Stations/StationPage';


export class ProfilePage extends Component {


  render() {
    return (
      <div className="main-wrapper profile-tabs ">
        <Tabs defaultActiveKey="form" id="uncontrolled-tab-example">

  <Tab eventKey="form" title="Bilgilerim">
    <ProfileForm/>
  </Tab>
  <Tab eventKey="station" title="İstasyonlarım">
      <StationPage/>
  </Tab>
  <Tab eventKey="prices" title="Ücretlerim" >
  <ServicePricing/>
  </Tab>
{/*  <Tab eventKey="docs" title="Belgelerimi Yönet" >
  <div> Features
    <span style={{position: 'absolute', bottom: '0', right: '0'}}></span>
  </div>
  </Tab> */}
</Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps)(ProfilePage)
