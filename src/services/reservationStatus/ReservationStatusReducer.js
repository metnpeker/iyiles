import { CAROUSEL_PROVIDER, CAROUSEL_PROVIDER_READY, RESERVATION_DATA, RESERVATION_DATA_LOADING } from '../types';

const initialState = {
  loading: false,
  appointmentsData : {},
  carouselData : {}
};


export default function (state = initialState, action){
  switch(action.type){
    case RESERVATION_DATA_LOADING:
      return{
        ...state, 
        loading: true
      }

    case RESERVATION_DATA: //GET_STATUS
      return {
        ...state,
        loading: false,
        appointmentsData: action.payload
      };
    
      case CAROUSEL_PROVIDER_READY:
        return { ...state,
           loading:true };
      case CAROUSEL_PROVIDER:
        return {
          ...state,
          carouselData: action.payload,
          loading:false };
      default:
      return state;
    }
  }
