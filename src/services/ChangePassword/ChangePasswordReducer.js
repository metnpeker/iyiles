import { PASSWORD_RESET_FAIL, PASSWORD_RESET_SUCCESS, CHANGE_PASSWORD_READY, CHANGE_PASSWORD } from '../types'

const initialState = {
  loading: false,
  success: false,
  fail: false,
}
export default function (state = initialState, action){
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        loading : false,
        success: false,
        fail: false
      }
    case CHANGE_PASSWORD_READY:
       return {
         ...state,
         loading: true,
         success: false,
         fail: false,
       }
    case PASSWORD_RESET_SUCCESS:
       return {
         ...state,
         success: true,
       }
    case PASSWORD_RESET_FAIL:
       return {
         ...state,
         fail: true
       }
    default:
      return state;
  }
}
