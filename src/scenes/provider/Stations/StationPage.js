import React from 'react';
import  './StationInformationStyle.css';
import {connect} from 'react-redux';
import StationInformation from './components/StationInformation';
import StationDetail from './components/StationDetail';
import {stationInformation} from '../../../services/provider/Stations/StationAction';

class StationPage extends React.Component {
  constructor(props){
    super(props)
    this.props.stationInformation();

  }
  componentWillReceiveProps(newProps) {

     }

  render () {
    const stations = this.props.stations.map((station)=>{
      return <StationDetail station={station} key={station.sta_name+station.sta_address_desc+station.sta_address}/>
    })
    return (
      <div style = {{width : "100%"}}>
        {stations}
        <StationInformation providerID={this.props.provider.pro_id}/>


      </div>
    )
  }
}
const mapStateToProps = state => ({
  stations : state.stationInfo.stationsLocationInformation,
  provider : state.business.providerProfile.providerProfileInformation
})
export default connect (mapStateToProps,{stationInformation}) (StationPage)
