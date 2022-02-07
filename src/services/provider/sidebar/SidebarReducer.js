import {GET_APPOINTMENT_READY, GET_APPOINTMENT_SUCCESS, GET_APPOINTMENT_FAIL,SELECT_APPOINTMENT,ACCEPT_APPOINTMENT} from '../types';

const initialState = {
    loading: false,
    fail: false,
    selectedAppointment: null,
    appointments : [],
  };

export default function(state = initialState, action){
    switch(action.type){
        case GET_APPOINTMENT_READY:
            return {
                ...state,
                loading: true
            };
        case GET_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                appointments: action.payload
            };
        case GET_APPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                fail: true
            };
        case SELECT_APPOINTMENT:
            const appointmentsData = state.appointments.filter(function(appointment){
                appointment.app_is_seen = appointment.app_id === action.payload ? 1 : appointment.app_is_seen
                return appointment;
            })
            return{
                ...state,
                appointments: appointmentsData,
                selectedAppointment: action.payload
            }
        case ACCEPT_APPOINTMENT:
            return{
                ...state,
                //loading false'a çevirelecek yine loading'i true olucak type daha yok
            }
        default:
            return state;
    }
}
