import {ACCEPT_APPOINTMENT, ACCEPT_APPOINTMENT_FAIL, REJECT_APPOINTMENT_FAIL, REJECT_APPOINTMENT, APPOINTMENT_STATUS_READY } from '../types';

const initialState = {
  loading: false,
  appointmentSuccess:false,
  appointmentFailed: false,
  appointmentRejectSuccess:false,
  appointmentRejectFailed: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APPOINTMENT_STATUS_READY:
     return {
       ...state,
       loading: true,
       appointmentSuccess:false,
       appointmentFailed: false,
       appointmentRejectSuccess:false
    };
    case ACCEPT_APPOINTMENT:
     return {...state,
      appointmentSuccess: true,
      appointmentFailed: false
    };
    case ACCEPT_APPOINTMENT_FAIL:
     return {...state,
      appointmentSuccess: false,
      appointmentFailed: true
    };
    case REJECT_APPOINTMENT:
      return {
        ...state,
        appointmentRejectSuccess:true,
        appointmentFailed: false

     };
    case REJECT_APPOINTMENT_FAIL:
      return {
        ...state,
        appointmentRejectSuccess:false,
        appointmentFailed: true
      };
    default:
     return state;
  }
}
