import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import {getAppointments, selectAppointment} from '../../../services/provider/sidebar/sidebarAction';
import './Sidebar.css';
import SidebarAppointment from './components/SidebarAppointment';
class Sidebar extends Component {
    constructor(props){
        super(props)
        this.props.getAppointments();
    }
    appointmentSelectedHandler = (id) => {

        this.props.selectAppointment(id);
    }

    sorting(array){
        array.sort(function(a,b){
            const now = moment();
            const last = moment(a.app_appointment_time,'DD-MM-YYYY HH:mm');
            const hoursLefttoLast = last.diff(now, 'hours', true);
            const next = moment(b.app_appointment_time,'DD-MM-YYYY HH:mm');
            const hoursLefttoNext = next.diff(now, 'hours', true);
            return hoursLefttoNext > hoursLefttoLast ? -1 : 1;
        });
    }
    render() {
        const {loading} = this.props.status;
        if(loading){
            return (
              <div>
                <div className="sidebar-wrapper">
                    <div>
                        <h2>Rezervasyon Talepleri</h2>
                        <p>loading</p>
                    </div>
                    <div>
                        <h2>Sıradaki Rezervasyon</h2>
                        <p>loading</p>
                    </div>
                </div>
            </div>


            )
        }else{
            const requestFilterArray = this.props.appointments.filter(appointment => { return appointment.app_status === 1 });
            const nextFilterArray = this.props.appointments.filter(appointment => { return appointment.app_status === 2 });

             this.sorting(requestFilterArray);
             this.sorting(nextFilterArray);
            const appointmentRequests= requestFilterArray.map((appointment) =>{
              const now = moment();
              const appoDate = moment(appointment.app_appointment_time, 'DD-MM-YYYY HH:mm')
              const hoursLeft = now.diff(appoDate, 'hours', true);
              if(hoursLeft<0){
            return  <SidebarAppointment
                            key={appointment.app_id}
                            service={appointment.service.s_name}
                            from={appointment.app_from.substring(0,10)+'...'}
                            to={appointment.app_to.substring(0,10)+'...'}
                            date={appointment.app_appointment_time}
                            seen = {appointment.app_is_seen}
                            clicked={()=> this.appointmentSelectedHandler(appointment.app_id) }
                            
                          />

            }})

            const queuedAppointments= nextFilterArray.map((appointment) =>{
              const now = moment();
              const appoDate = moment(appointment.app_appointment_time, 'DD-MM-YYYY HH:mm')
              const hoursLeft = now.diff(appoDate, 'hours', true);
              if(hoursLeft<0){
                return <SidebarAppointment
                            key={appointment.app_id}
                            service={appointment.service.s_name}
                            from={appointment.app_from.substring(0,10)+'...'}
                            to={appointment.app_to.substring(0,10)+'...'}
                            date={appointment.app_appointment_time}
                            clicked={()=> this.appointmentSelectedHandler(appointment.app_id) } />

            }})
            return (
                <div className="sidebar-wrapper" >
                <h2 style={{marginTop:'20px'}}>Rezervasyon Talepleri</h2>
                    <div className="overflow-auto">
                        {appointmentRequests}
                    </div>
                    <h2>Sıradaki Rezervasyon</h2>
                    <div className=" overflow-auto">
                        {queuedAppointments}
                    </div>
                </div>

            )
        }

    }
}
const mapStatetoProps = state =>({
    status: state.business.appointments, //loading ve fail
    appointments: state.business.appointments.appointments //appointments array
})
export default connect(mapStatetoProps, {getAppointments, selectAppointment})(Sidebar)
