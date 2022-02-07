import jwt_decode from 'jwt-decode';
import setAuthToken from './SetAuthToken';
import API from '../../api.js';

import { SET_CURRENT_USER, LOGIN_FACEBOOK, LOGIN_USER_FAIL, LOGIN_USER, LOGOUT_USER } from '../types';

export const loginUser = userData => dispatch => {
  dispatch({ type: LOGIN_USER });
  API.post('login', userData)
  .then(res => {
    const token = res.data.access_token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      userRole: res.data.user_role,
      payload: decoded
    });
  })
  .catch(err =>{
    dispatch({
      type: LOGIN_USER_FAIL
    });
  })
}
export const loginWithFacebook = userData => dispatch => {
  dispatch({ type: LOGIN_USER });
  API.post('login/facebook', userData)
  .then(res => {
    const token = res.data.access_token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      userRole: res.data.user_role,
      payload: decoded
    });
  })
  .catch(err =>{
    dispatch({
      type: LOGIN_USER_FAIL
    });
  })
}



export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
}
