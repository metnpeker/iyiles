import API from '../../api.js';

import { RESET_PATIENT_INFO, MEMBER_FORM, MEMBER_FORM_READY, MEMBER_FORM_FAIL, UPDATE_PATIENT_INFO, UPDATE_PATIENT_INFO_FAIL, UPDATE_USER_INFO, UPDATE_USER_INFO_FAIL, NEW_PATIENT_INFO, NEW_PATIENT_INFO_FAIL, UPDATE_PASSWORD_FAIL , UPDATE_PASSWORD_DATA } from '../types';
import {APPOINTMENT_STATUS_READY} from '../provider/types';
export const getMemberForm = () => dispatch => {
   dispatch ({ type: MEMBER_FORM_READY });
   dispatch ({type : APPOINTMENT_STATUS_READY});
  API.get('clients')
  .then(res => {
    dispatch({
      type: MEMBER_FORM,
      payload: res.data.data
    });
  })
  .catch(err => { dispatch ({
    type : MEMBER_FORM_FAIL
    });
  })
}

export const resetPatientInfo = () => dispatch =>{
  dispatch({
    type: RESET_PATIENT_INFO
  });
}

export const updatePatientInfo = (updatePatientData, id) => dispatch => {
  const id = updatePatientData.patient_id;
  API.put('patients/'+id , updatePatientData)
    .then(res=>{
      dispatch({
          type: UPDATE_PATIENT_INFO
      });
    })
    .catch(err=>{
      dispatch({
          type: UPDATE_PATIENT_INFO_FAIL
      });
    })
}

export const addNewPatient = newPatientForm => dispatch => {
  API.post('patients', newPatientForm)
    .then(res=>{
      dispatch({
          type: NEW_PATIENT_INFO,
          payload : res.data.data
      });
    })
    .catch(err=>{
      dispatch({
          type: NEW_PATIENT_INFO_FAIL
      });
    })
}

export const updateUserInfo = newUserData => dispatch => {
  API.put('users' , newUserData)
    .then(res=>{
      dispatch({
          type: UPDATE_USER_INFO
      });
    })
    .catch(err=>{
      dispatch({
          type: UPDATE_USER_INFO_FAIL
      });
    })
}

export const updatePassword = newPasswordData => dispatch => {
  API.post('users/change_password' ,newPasswordData)
    .then(res=>{
      dispatch({
          type: UPDATE_PASSWORD_DATA
      });
    })
    .catch(err=>{
      dispatch({
          type: UPDATE_PASSWORD_FAIL
      });
    })
}
