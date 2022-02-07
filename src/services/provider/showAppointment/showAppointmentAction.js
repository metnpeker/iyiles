import API from '../../../api';
import {ACCEPT_APPOINTMENT,ACCEPT_APPOINTMENT_FAIL, REJECT_APPOINTMENT, REJECT_APPOINTMENT_FAIL, APPOINTMENT_STATUS_READY } from '../types';

//function to accept app
export const evaluateAppointment = app => dispatch => {
  dispatch({
    type : APPOINTMENT_STATUS_READY
  })
  const id = app.app_id;
  API.get('/appointments/status/'+id+'/'+ app.app_status )
    .then(
      res => {
        dispatch({
          type: ACCEPT_APPOINTMENT
        })
      }
    )
    .catch(err=>{
      dispatch({
        type: ACCEPT_APPOINTMENT_FAIL
      })
    })
}

export const rejectReason = app => dispatch => {
  dispatch({
    type : APPOINTMENT_STATUS_READY
  })
const id = app.app_id;
console.log(app);
  API.post('/appointments/reject/'+id,  app)
  .then(
     res => {
       dispatch({
         type : REJECT_APPOINTMENT
       })
     }
  )
  .catch(err=>{
    dispatch({
      type : REJECT_APPOINTMENT_FAIL
    })
  })
}
