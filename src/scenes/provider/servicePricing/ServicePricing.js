import React from 'react';
import { connect } from 'react-redux';
import DistrictAreaSelect from './components/DistrictAreaSelect.js';
import PricingComponent1 from './components/PricingComponent1.js';
import PricingComponent4 from './components/PricingComponent4.js';

class ServicePricing extends React.Component {

  render(){
    const {provider_service, cities} = this.props.services;
    let ServiceComponents;
    let DistrictComponent;
    if(provider_service && cities){
      DistrictComponent = <DistrictAreaSelect/>
      ServiceComponents = provider_service.map((service)=>{
        if(service.ps_id!=='4'){
          return <PricingComponent1 key={service.ps_id} service={service} />
        }else{
          //sabit nokta component ve prop
          return
        }
      })

    }else{
      ServiceComponents = <p>yükleniyor...</p>
    }

    return(
      <div>
        {DistrictComponent}
        {ServiceComponents}
      </div>
    )
  }
}
const mapStateToProps = state =>({
  services: state.business.providerProfile.providerProfileInformation
})
export default connect(mapStateToProps)(ServicePricing);
