import {STATION_INFORMATION_READY, STATION_INFORMATION,UPDATE_STATION,UPDATE_STATION_FAIL,ADD_NEW_STATION,ADD_NEW_STATION_FAIL ,RESET_STATION_BOX} from '../types';

const initialState = {
    stationsLocationInformation : [],
    isSuccess: false,
    isFailed: false,
    isAddSuccess: false,
    isAddFailed: false,
    updatedStaID: null,
}
export default function (state= initialState, action) {
  switch(action.type){
    case RESET_STATION_BOX:
     return {
       ...state,
       isSuccess: false,
       isFailed: false,
       isAddSuccess: false,
       isAddFailed: false,
     }
      case STATION_INFORMATION_READY :
        return {
          ...state,
          loading : true,
        }
        case STATION_INFORMATION :
          return {
            ...state,
            loading : false,
            stationsLocationInformation : action.payload,
          }
          case UPDATE_STATION :
            return {
              ...state,
              loading : false,
              isSuccess: true,
              isFailed: false,
              updatedStaID: action.payload.sta_id
            }
           case UPDATE_STATION_FAIL:
            return {
              ...state,
              loading: false,
              isSuccess : false,
              isFailed: true,
              updatedStaID: action.payload.sta_id
            }
            case ADD_NEW_STATION :
              return {
                ...state,
                loading : false,
                isAddSuccess: true,
                isAddFailed: false,
              }
             case ADD_NEW_STATION_FAIL:
              return {
                ...state,
                loading: false,
                isAddSuccess : false,
                isAddFailed: true
              }
          default :
          return state;
      }
}
