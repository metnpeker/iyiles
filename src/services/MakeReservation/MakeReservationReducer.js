 import { MAKE_RESERVATION,MAKE_RESERVATION_READY, MAKE_RESERVATION_DATA, MAKE_RESERVATION_FAIL, GET_PATIENTS, UPDATE_PATIENT, ADD_RELATIVE} from '../types';

const userReservationData = {
  selectedPatient: false,
  makingReservation: {},
  setPatientInfo : {},
  listPatient : {},
  loading: false,
  app_id: null,
  message: '',
  fail: false

};

export default function (state = userReservationData, action){
  switch(action.type){
    case MAKE_RESERVATION_READY:
      return {
        ...state,
        selectedPatient: false,
        loading : true,
        fail: false,
        success: false
      }
    case MAKE_RESERVATION_DATA:
      return {
        ...state,
        loading : false,
        app_id: action.payload.app_id
      };
    case MAKE_RESERVATION_FAIL:
      return {
        ...state,
        loading : false,
        fail: true,
        message: action.payload
      };
    case MAKE_RESERVATION:
      return {
        ...state,
        makingReservation: action.payload,
        loading : false,
        app_id: null,
        fail: false

      };
      case ADD_RELATIVE:
        return {
          ...state,
          loading : false
        }
      case GET_PATIENTS :
        return {
          ...state,
          setPatientInfo : action.payload,
        }
        case UPDATE_PATIENT :
        return {
          ...state,
          loading : false,
        }
    default:
    return state;
  }
}
