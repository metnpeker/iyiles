import API from '../../api.js';

import { PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL, CHANGE_PASSWORD_READY, CHANGE_PASSWORD} from '../types';

export const changePasswordReady = () => dispatch => {
  dispatch ({type : CHANGE_PASSWORD});
}

export const passwordReset = userData => dispatch => {
  dispatch ({type : CHANGE_PASSWORD_READY});
    API.post('password/create',userData)
    .then(res =>{
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });
    })
    .catch(err=>{
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    })
}

export const passwordChange = userData => dispatch => {
  dispatch ({type : CHANGE_PASSWORD_READY});
    API.post('password/reset',userData)
    .then(res =>{
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });
    })
    .catch(err=>{
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    })
}
