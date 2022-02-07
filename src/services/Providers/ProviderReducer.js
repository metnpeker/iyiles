import {
  FILTER_PROVIDERS,
  GET_FILTER_PROVIDERS,
  FILTER_PROVIDERS_FAIL,
  GET_SERVICES,
  GET_SERVICES_FAIL,
  SEND_FILTER_DATA,
  UPDATE_PROVIDERS_PRICE
} from '../types';

const initialState = {
  loading: false,
  providersData: [],
  servicesData: [],
  calculatePrice: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        servicesData: action.payload
      };
      case SEND_FILTER_DATA:
        return {
          ...state,
          userFilterData: action.payload
        };
    case GET_SERVICES_FAIL:
      return {
        ...state,
        servicesData: action.payload
      };
    case GET_FILTER_PROVIDERS:
      return {
        ...state,
        calculatePrice: false,
        loading: true
      }
    case FILTER_PROVIDERS:
      return {
        ...state,
        loading: true,
        providersData: action.payload
      };
    case FILTER_PROVIDERS_FAIL:
      return {
        ...state,
        loading: false,
        fail: true
      };
    case UPDATE_PROVIDERS_PRICE:
      return {
        ...state,
        loading: false,
        providersData: action.payload
      };
    default:
      return state;
  }
}
