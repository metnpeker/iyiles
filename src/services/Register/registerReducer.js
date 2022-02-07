import { REGISTER_USER_FAIL, REGISTER_USER,REGISTER_USER_REQUEST, VERIFICATION_CODE, SET_VERIFICATION_CODE, VERIFICATION_CODE_FAIL, CODE_SUBMIT, SET_CODE_SUBMIT, CODE_SUBMIT_FAIL} from '../types';

const initialState = {
 loading: false,
 fail: false,
 isAuthenticated: false,
 user: {},
 registerCode: {},
 onSubmitCode: {}
};

export default function(state = initialState, action) {
 switch (action.type) {
  case REGISTER_USER_REQUEST:
    return { ...state, loading: true };
  case REGISTER_USER_FAIL:
    return {...state,  loading: false, fail: true };
  case REGISTER_USER:
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
    };
   case VERIFICATION_CODE:
     return {...state, loading: true};
   case SET_VERIFICATION_CODE:
      return {
        ...state,
        loading: false,
        registerCode: action.payload
      };
    case VERIFICATION_CODE_FAIL:
       return {...state,  loading: false, fail: true };
       case CODE_SUBMIT:
         return {...state, loading: true};
       case SET_CODE_SUBMIT:
          return {
            ...state,
            loading: false,
            isAuthenticated: true,
            onSubmitCode: action.payload,
            userRole: action.userRole,
            user: action.payload
          };
        case CODE_SUBMIT_FAIL:
           return {...state,  loading: false, fail: true };
    default:
     return state;
  }
}
