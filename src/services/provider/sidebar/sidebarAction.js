import API from '../../../api.js';
import {GET_APPOINTMENT_READY, GET_APPOINTMENT_SUCCESS, GET_APPOINTMENT_FAIL, SELECT_APPOINTMENT, APPOINTMENT_STATUS_READY } from '../types';

export const getAppointments = () => dispatch => {
    dispatch({type: GET_APPOINTMENT_READY}); // to dispatch loading indicator
    API.get('appointments') //bütün appointmentlar geliyor benim tek bir providerınkini çekmem lazım
        .then(res => {
            dispatch({
                type: GET_APPOINTMENT_SUCCESS,
                payload: res.data.data
            });
        })
        .catch(err =>{
            dispatch({type: GET_APPOINTMENT_FAIL})
        })
}

export const selectAppointment= (id) => dispatch=>{

    dispatch({
      type : APPOINTMENT_STATUS_READY
    })
  API.get('appointments/app_is_seen/'+id) //bütün appointmentlar geliyor benim tek bir providerınkini çekmem lazım
      .then(res => {
        dispatch({
            type: SELECT_APPOINTMENT,
            payload: id
        })
      })
      .catch(err =>{
          dispatch({type: GET_APPOINTMENT_FAIL})
      })
}
