import { SET_CURRENT_USER, LOGIN_USER_FAIL, LOGIN_USER } from '../types';

const initialState = {
 loading: false,
 fail: false,
 isAuthenticated: false,
 userRole: '',
 user: {}
};

export default function(state = initialState, action) {

 switch (action.type) {
  case LOGIN_USER:
    return { ...state, loading: true };
  case LOGIN_USER_FAIL:
    return {...state,  loading: false, fail: true };
  case SET_CURRENT_USER:
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      userRole: action.userRole,
      user: action.payload
    };
    default:
     return state;
  }
}
