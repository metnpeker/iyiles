import React, { Component } from 'react';
import ButtonCTA from './ButtonCTA';
 class Hero extends Component {
  render() {
    return (
      <div className = "main-hero">
        <h1 style={{marginBottom: '30px'}}>Sana En Uygun Ambulans Firmasını Seç!</h1>
        <ButtonCTA/>
      </div>
    )
  }
}

export default Hero;
