import React from 'react';
import {connect} from 'react-redux';
import { Accordion, Card } from 'react-bootstrap';
import './allServices.css';
import ShowAppointment from '../../../components/provider/ShowAppointment/ShowAppointment';
import ServiceList from './components/ServiceList.js';
import ServiceTitle from './components/ServiceTitle.js';
import Pagination from '../../../components/provider/Pagination/Pagination';


class AllServices extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentPage: 1,
      perPage: 10,
    }
   }
   paginate =(number) =>{
    this.setState({
      currentPage: number
    },()=>{
     window.scrollTo(0, 0);
    })
  }

  render() {
    const allServices = this.props.appointments;
    const indexOfLastService = this.state.currentPage * this.state.perPage;
    const indexOfFirstService = indexOfLastService - this.state.perPage;
    const currentServices = allServices.reverse().slice(indexOfFirstService, indexOfLastService);
    const displayServices = currentServices.map((appointment) => {
      return <React.Fragment key={appointment.app_id}>
              <Accordion.Toggle eventKey={appointment.app_id} className="accordionHeader" as={Card.Header} >
                <ServiceList
                  name={appointment.patient.pa_name}
                  surname= {appointment.patient.pa_surname}
                  serviceType={appointment.service.s_name}
                  from={appointment.patient.pa_from}
                  to={appointment.patient.pa_to}
                  date={appointment.app_appointment_time}
                  price={appointment.app_price}
                  status={appointment.app_status}
                />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={appointment.app_id} className="collapseElementContainer" >
                <ShowAppointment
                  all={appointment}
                />
              </Accordion.Collapse>
            </React.Fragment>
    })
   return (

    <div className="main-wrapper">
    <ServiceTitle/>

    <Accordion >
     {displayServices}
    </Accordion>
    <Pagination perPage={this.state.perPage} total={allServices.length} paginate={this.paginate} currentPage={this.state.currentPage}/>

    </div>

   )
  }
}
const mapStateToProps = state =>({
  appointmentStatus: state.business.appointments,
  appointments: state.business.appointments.appointments

})
export default connect(mapStateToProps)(AllServices);
