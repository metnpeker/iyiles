import { RESET_PATIENT_INFO, MEMBER_FORM, MEMBER_FORM_READY, MEMBER_FORM_FAIL,UPDATE_PATIENT_INFO,UPDATE_PATIENT_INFO_FAIL, UPDATE_USER_INFO,UPDATE_USER_INFO_FAIL, NEW_PATIENT_INFO,NEW_PATIENT_CLEAR,NEW_PATIENT_INFO_FAIL, UPDATE_PASSWORD_FAIL , UPDATE_PASSWORD_DATA  } from '../types';

const initialState = {
  loading: false,
  membersData : {},
  selectedPatient: false,
  isFailed : false,
  isSuccess : false,
  isMemberFailed : false,
  isMemberSuccess : false,
  isPatientFailed : false,
  isPatientSuccess : false,
  isPasswordSuccess: false,
  isPasswordFailed: false,
  newPatientId : null,
};

export default function(state = initialState, action) {
 switch (action.type) {
   case RESET_PATIENT_INFO:
    return {...state,
      selectedPatient: false,
      isPatientFailed : false,
      isPatientSuccess : false,};

  case MEMBER_FORM_READY:
    return {
      ...state,
      loading: true,
      isFailed: false,
      isSuccess : false,
      isMemberFailed : false,
      isMemberSuccess : false,
     };
  case MEMBER_FORM:
    return {
      ...state,
      loading: false,
      membersData: action.payload,
    };
  case MEMBER_FORM_FAIL :
      return {
        ...state,
        loading : false,
  };
  case UPDATE_PATIENT_INFO:
    return{
      ...state,
      loading:false,
      selectedPatient: false,
      isSuccess : true,
      isFailed: false
    };
  case UPDATE_PATIENT_INFO_FAIL :
    return {
    ...state,
    loading : false,
    isFailed : true,
    isSuccess: false
  };
  case UPDATE_USER_INFO:
    return{
        ...state,
        loading:false,
        isMemberFailed : false,
        isMemberSuccess : true,
      };
  case UPDATE_USER_INFO_FAIL :
    return {
      ...state,
      loading: false,
      isMemberFailed : true,
      isMemberSuccess : false,
  };
  case NEW_PATIENT_INFO:
    return{
      ...state,
        loading:false,
        isPatientSuccess : true,
        isPatientFailed: false,
        newPatientId :action.payload.pa_id
      };
  case NEW_PATIENT_CLEAR:
    return{
      ...state,
        newPatientId : null,
      };
  case NEW_PATIENT_INFO_FAIL:
      return{
        ...state,
        loading : false,
        isPatientFailed : true,
        isPatientSuccess: false
      };
      case UPDATE_PASSWORD_DATA :
        return{
          ...state,
            loading:false,
            isPasswordSuccess: true,
            isPasswordFailed: false
          };
      case UPDATE_PASSWORD_FAIL :
          return{
           ...state,
              loading:false,
              isPasswordSuccess: false,
              isPasswordFailed: true
              };
    default:
     return state;
  }
}
