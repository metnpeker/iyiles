import React, { Component } from 'react';
import ShowAppointment from '../../../components/provider/ShowAppointment/ShowAppointment'
import {connect} from 'react-redux';
import './home.css';
import b2bimage from '../../../components/provider/Images/b2bimage.png';

class Home extends Component {
  constructor(props){
    super(props);
      this.state = {
    }

    let auth = this.props.auth;
    let OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: "2129149c-c5df-49b4-b6cc-f4facb39b6aa",
        notifyButton: {
          enable: true,
        },
      });
      OneSignal.setExternalUserId(auth.user.sub);
      OneSignal.sendTag("user_type", auth.userRole);
    });

  }
    render() {
        const appointmentId = this.props.status.selectedAppointment;
        const [appointment]= this.props.appointments.filter(function(appointment){
            return appointment.app_id === appointmentId;
        })
        if(appointment === undefined){
            return(
              <div className="main-wrapper-image">
                <img  style={{width:'100%'}} alt='b2bimage' src={b2bimage} />
                  <div className='onesignal-customlink-container'></div>
              </div>
            )
        }else{

        return (
            <div className="main-wrapper">
                <div className="appointment-header">
                <h2>{appointment.service.s_name}</h2>
                <h2>{appointment.app_appointment_time}</h2>
                </div>
                <img src={global.MyVar + this.props.profileProviderData.pro_logo} alt="ambulance-logo" style= {{borderRadius: '50%', width: '70px', float: 'right'}}/>
                <ShowAppointment
                    all={appointment}
                />
            </div>
        )
        }
    }
}
const mapStatetoProps = state => ({
    auth: state.auth,
    status: state.business.appointments,
    appointments: state.business.appointments.appointments,
    profileProviderData : state.business.providerProfile.providerProfileInformation
 })
 export default connect(mapStatetoProps)(Home);
