import jwt_decode from 'jwt-decode';
import setAuthToken from '../Login/SetAuthToken';
import API from '../../api.js';
import {SET_CURRENT_USER, REGISTER_USER_FAIL, REGISTER_USER,REGISTER_USER_REQUEST, VERIFICATION_CODE_FAIL, VERIFICATION_CODE, SET_VERIFICATION_CODE} from '../types';

export const registerUser = userData => dispatch => {
    dispatch({type: REGISTER_USER_REQUEST});
    API.post('users',userData) 
    .then(res =>{
        const token = res.data.data.access_token;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch({
            type: SET_CURRENT_USER,
            userRole: res.data.data.user_role,
            payload: decoded
        });
    })
    .catch(err=>{
        dispatch({
            type: REGISTER_USER_FAIL
        });
    })
}

export const verificationCode = codeData => dispatch => {
  dispatch({ type: VERIFICATION_CODE });
  API.post('users/phone-check', codeData)
  .then(res => {
    dispatch({
      type: SET_VERIFICATION_CODE,
      payload: res.data.data
    });
  })
  .catch(err =>{
    dispatch({
      type: VERIFICATION_CODE_FAIL
    });
  })
}
