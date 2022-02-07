import API from '../../api.js';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../Login/SetAuthToken';
import { SET_CURRENT_USER, MAKE_RESERVATION,MAKE_RESERVATION_READY, MAKE_RESERVATION_DATA, MAKE_RESERVATION_FAIL, GET_PATIENTS, UPDATE_PATIENT, UPDATE_PATIENT_FAIL, ADD_RELATIVE,ADD_RELATIVE_FAIL,NEW_PATIENT_CLEAR} from '../types';

export const userReservation = (provider) => dispatch => {

  dispatch ({ type: MAKE_RESERVATION_READY });
      dispatch ({
        type: MAKE_RESERVATION,
        payload: provider,
      });
  // API.get('providers/'+providerId)
  //   .then(res =>{
  //     dispatch ({
  //       type: MAKE_RESERVATION,
  //       payload: res.data.data
  //     });
  //   })
  //   .catch(err => {
  //
  //   })
}

export const createReservation = (reservationData) =>dispatch => {
  dispatch ({ type: MAKE_RESERVATION_READY });
  API.post('appointments/auth', reservationData)
  .then(res =>{

    if(res.data.success){
      dispatch ({
        type: MAKE_RESERVATION_DATA,
        payload: res.data.data
      });
      dispatch ({
        type: NEW_PATIENT_CLEAR
      });
    }else{
      dispatch ({
        type: MAKE_RESERVATION_FAIL,
        payload: res.data.message
      });
    }
  })
  .catch(err => {
      dispatch ({
        type: MAKE_RESERVATION_FAIL,
        payload: err.message
      });
  });
}

export const createReservationNotRegister = (reservationData) =>dispatch => {
  dispatch ({ type: MAKE_RESERVATION_READY });
  API.post('appointments', reservationData)

  .then(res =>{
    console.log(res);
    console.log('make',res.message);
    if(res.data.success){
      const token = res.data.data.auth.access_token;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token)
      dispatch ({
        type: SET_CURRENT_USER,
        userRole : res.data.data.auth.user_role,
        payload: decoded
      })
      dispatch ({
        type: MAKE_RESERVATION_DATA,
        payload: res.data.data
      });
    }else{
      dispatch ({
        type: MAKE_RESERVATION_FAIL,
        payload: res.data.message
      });
    }
  })
  .catch(err => {
    console.log(err.response);
      dispatch ({
        type: MAKE_RESERVATION_FAIL,
        payload: err.response.data.message
      });
  });
}

export const getPatient = ()=> dispatch => {
  API.get('patients')
    .then (res => {
      dispatch({
        type : GET_PATIENTS,
        payload : res.data.data
       });
  })
  .catch(err => {

  })
}
export const updatePatient = updatePatientData=> dispatch => {
  const id = updatePatientData.pa_id;
  API.put ('patients/'+id, updatePatientData)
    .then (res => {
      dispatch({ type : UPDATE_PATIENT });
  })
  .catch(err => {
  dispatch ({
    type : UPDATE_PATIENT_FAIL
    }) ;
  })
}
export const addRelative = newRelativeData => dispatch => {

  API.post('users', newRelativeData)
    .then (res => {
      dispatch({ type : ADD_RELATIVE });
  })
  .catch(err => {
  dispatch ({
    type : ADD_RELATIVE_FAIL
  }) ;
  })
}
