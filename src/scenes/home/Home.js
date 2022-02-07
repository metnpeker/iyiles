import React, { Component } from 'react';
import Hero from './components/Hero';
import Steps from './components/Steps';
import StepsInfo from './components/StepsInfo';
import TabInfo from './components/TabInfo';
import './homeStyle.css';
import ReviewCarousel from './components/ReviewCarousel';

class Home extends Component {

    constructor(props) {
      super();
    }
    render(){
        return(
        <div>
            <Hero />
            <Steps />
            <StepsInfo />
            <TabInfo />
            <ReviewCarousel/>
        </div>
        );
    }
}
export default Home;
